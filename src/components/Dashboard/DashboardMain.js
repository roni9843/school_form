import React, { useEffect, useState } from "react";
import IdCardDesign from "./IdCardDesign";

export default function DashboardMain() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "https://school-form-backend.vercel.app/api/getAllStudentInfo"
        );
        const data = await response.json();

        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>All Students</h3>
          {students.length === 0 ? (
            <p>No student data available.</p>
          ) : (
            <div>
              {students.map((student) => (
                <div
                  className="p-2"
                  style={{
                    display: "inline-block",
                  }}
                >
                  <div>
                    <IdCardDesign
                      student_image={student.studentImage}
                      name={student.studentName}
                      roll={student.studentRoll}
                      student_class={student.class}
                      session={student.session}
                      studentBloodGrp={student.studentBloodGrp}
                    ></IdCardDesign>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

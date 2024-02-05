import React, { useEffect, useState } from "react";
import IdCardDesign from "./IdCardDesign";

export default function DashboardMain({ admin }) {
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

  // State for the selected class
  const [selectedClass, setSelectedClass] = useState("");

  // Extract unique classes from student data and sort them
  const allClasses = Array.from(
    new Set(students.map((student) => student.class))
  ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Function to handle class selection
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  // Function to handle student deletion
  const handleDeleteSuccess = (deletedStudentId) => {
    console.log(deletedStudentId);
    // Filter out the deleted student from the students array
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== deletedStudentId)
    );
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">All Students</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="classSelect">Select Class:</label>
                <select
                  id="classSelect"
                  className="form-control mb-3"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  <option value="">All</option>
                  {allClasses.map((classOption) => (
                    <option key={classOption} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
              </div>
              {students.length === 0 ? (
                <p>No student data available.</p>
              ) : (
                <div className="row">
                  {students
                    .filter(
                      (student) =>
                        selectedClass === "" || student.class === selectedClass
                    )
                    .map((student) => (
                      <div key={student.id} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <IdCardDesign
                              student_image={student.studentImage}
                              name={student.studentName}
                              roll={student.studentRoll}
                              student_class={student.class}
                              session={student.session}
                              studentBloodGrp={student.studentBloodGrp}
                              admin={admin}
                              id={student._id}
                              onDeleteSuccess={handleDeleteSuccess}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

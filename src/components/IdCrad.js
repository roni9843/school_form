import React from "react";
import styled from "styled-components";

export default function IdCrad({ student_image, formData }) {
  return (
    <IdCard>
      <div className="body">
        <div>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <h3>Logo</h3>
          </div>
          <div>
            <h6
              style={{
                fontSize: "12px",
                fontFamily: "'Merriweather', serif",
                fontWeight: "bold",
              }}
            >
              Natun Sonakanda High School
            </h6>
          </div>
          <div>
            <h6
              style={{
                fontSize: "9px",
                fontFamily: "'Merriweather', serif",
                textAlign: "center",

                marginTop: "-5px",
              }}
            >
              Natun Sonakanda, Ruhitpur,
            </h6>
          </div>
          <div>
            <h6
              style={{
                fontSize: "9px",
                fontFamily: "'Merriweather', serif",
                textAlign: "center",
                marginTop: "-5px",
              }}
            >
              Keranigonj, Dhaka-1310
            </h6>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                margin: "0 15px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: "bold",
                    fontFamily: "'Merriweather', serif",
                    fontSize: "15px",
                  }}
                >
                  Student
                </h3>
              </div>
              <div>
                <img
                  style={{
                    width: "50px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "2px solid black",
                  }}
                  src={student_image}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#ACEFFF",
              margin: "5px 0px",
              textAlign: "center",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Merriweather', serif",
                  fontSize: "14px",
                  padding: "5px",
                }}
              >
                {formData.studentName}
              </h3>
            </div>
          </div>
          <div
            style={{
              fontFamily: "'Merriweather', serif",
              fontSize: "10px",
              paddingLeft: "15px",
              fontWeight: "bold",
            }}
          >
            <div>
              <span>Class</span>
              <span
                style={{
                  paddingLeft: "36px",
                }}
              >
                : {formData.class}
              </span>
            </div>
            <div>
              <span>Roll</span>
              <span
                style={{
                  paddingLeft: "42px",
                }}
              >
                : {formData.studentRoll}
              </span>
            </div>
            <div>
              <span>Session</span>
              <span
                style={{
                  paddingLeft: "25px",
                }}
              >
                : 2024
              </span>
            </div>
            <div>
              <span>Blood Group</span>
              <span
                style={{
                  paddingLeft: "0px",
                }}
              >
                : {formData.studentBloodGrp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </IdCard>
  );
}

const IdCard = styled.form`
  .body {
    margin: 0;
    padding: 0;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    height: 3in;
    width: 2in;
    background-color: #eaf9fe;
    font-family: Arial, sans-serif;
  }
`;

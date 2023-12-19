import React, { useState, useEffect } from "react";
import "./MakeAppointment";
import Sidebar from "./Sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Application = () => {
  const [email, setEmail] = useState("");
  const [subjectName, setSubject] = useState("");
  const [subjectGrade, setSubjectGrade] = useState("");
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  const [application, setApplication] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentStudentId = decodedToken.StudentID;

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios.put("http://localhost:8080/api/appointments");

          const studentResponse = await axios.get(
            `http://localhost:8080/api/students/${currentStudentId}`,
            { headers }
          );
          setStudent(studentResponse.data.student);

          const tutorResponse = await axios.get(
            `http://localhost:8080/api/tutors/${currentStudentId}`
          );
          setTutorID(tutorResponse.data.TutorID);
          const previousApplication = await axios.get(
            `http://localhost:8080/api/applications/${currentStudentId}`
          );
          if (previousApplication.data.applications.length > 0) {
            const recentApplication = previousApplication.data.applications[0];
            if (recentApplication.Result === "Pending" || recentApplication.Result === "denied") {
              alert(`Your recent application status: ${recentApplication.Result}`);
            }
          }
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const previousApplication = await axios.get(
        `http://localhost:8080/api/applications/${student.StudentID}`
      );
      console.log(previousApplication);

      if (previousApplication.data.applications.length > 0) {
        await axios.delete(
          `http://localhost:8080/api/applications/${student.StudentID}`
        );
      }

      await axios.post("http://localhost:8080/api/application", {
        email: email,
        subjectName: subjectName,
        subjectGrade: subjectGrade,
      });

      setEmail("");
      setSubject("");
      setSubjectGrade("");

      window.alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      window.alert("Failed to submit the application. Please try again.");
    }
  };

  const styleContainer2 = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div className="wrapper">
            <form action="" onSubmit={handleSubmit}>
              <h2>
                Welcome!
                <br />
                <span>Send your request now</span>
              </h2>

              <div className="input-box">
                <label className="sub_title" htmlFor="studentName">
                  Your Email
                </label>
                <input
                  placeholder="Enter your Email"
                  className="form_style"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <label className="sub_title" htmlFor="subjectName">
                  Subject name
                </label>
                <input
                  placeholder="Enter the subject name"
                  className="form_style"
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <label className="sub_title" htmlFor="subjectGrade">
                  Subject grade
                </label>
                <input
                  placeholder="Enter your subject grade"
                  className="form_style"
                  type="text"
                  value={subjectGrade}
                  onChange={(e) => setSubjectGrade(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div>
                <button className="btn" type="submit">
                  APPLY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;

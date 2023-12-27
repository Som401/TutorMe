import "../../studentComponents/view/MakeAppointment.css";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const AddSubject = () => {
  
    const [student, setStudent] = useState({});
    const [subjectName, setSubjectName] = useState("");

  
    console.log(student);
  
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
  
            const studentResponse = await axios.get(
              `http://localhost:8080/api/students/${currentStudentId}`,
              { headers }
            );
            setStudent(studentResponse.data.student);
          } catch (error) {
            console.error("Token decoding or fetching data error:", error);
          }
        }
      };
      console.log(student)
      fetchData();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post(`http://localhost:8080/api/subjects/${subjectName}`);
        console.log(response.data);
        alert(response.data.msg);
      } catch (error) {
        console.error('Error adding subject:', error);
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
        <Sidebar student={student}/>
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
                <span>Give us your feedback</span>
              </h2>

              <div className="input-box">
                <label htmlFor="studentName">Subject name</label>
                <input
                  type="text"
                  placeholder="Subject name"
                  name="SubjectID"
                  id="SubjectID"
                  className="input"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn">
                Let's go →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;

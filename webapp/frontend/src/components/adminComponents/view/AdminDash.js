import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import Dash from "../components/Dash";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function TutorDash() {
  const [student, setStudent] = useState({});
  const [Application, setApplication] = useState([]);
  const [Students, setStudents] = useState([]);
  const [Tutors, setTutors] = useState([]);

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
        
          const ApplicationResponse = await axios.get(
            `http://localhost:8080/api/applications`
          );
          setApplication(ApplicationResponse.data.applications);
          const studentsResponse = await axios.get(
            `http://localhost:8080/api/students`
          );
          setStudents(studentsResponse.data.students);
          const tutorsResponse = await axios.get(
            `http://localhost:8080/api/tutors`
          );
          setTutors(tutorsResponse.data.tutors);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };
    console.log(student)
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student}/>
      </div>
      <div>
        <Dash Students={Students} Application={Application} Tutors={Tutors}/>
      </div>
    </div>
  );
}
export default TutorDash;

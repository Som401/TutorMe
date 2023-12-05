import React, {useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import Sidebar from "./Sidebar";
import Dash from "./Dash";

export const StudentDash = () => {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  const [Appointment, setAppointment] = useState([]);
  const [Requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentStudentId = decodedToken.StudentID;

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios.put('http://localhost:8080/api/appointments');

          const studentResponse = await axios.get(`http://localhost:8080/api/students/${currentStudentId}`, { headers });
          setStudent(studentResponse.data.student);

          const tutorResponse = await axios.get(`http://localhost:8080/api/tutors/${currentStudentId}`);
          setTutorID(tutorResponse.data.TutorID);
          const tutorAppointments = await axios.get(
            `http://localhost:8080/api/studentappointments/approved/${currentStudentId}`
          );
          setAppointment(tutorAppointments.data.appointments);
          const tutorRequests = await axios.get(
            `http://localhost:8080/api/studentappointments/pending/${currentStudentId}`
          );
          setRequests(tutorRequests.data.appointments);
        } catch (error) {
          console.error('Token decoding or fetching data error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
   
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginRight: "16%" }}>
          <Sidebar student={student} tutorID={tutorID}  />
        </div>
        <div>
          <Dash student={student} Appointment={Appointment} Requests={Requests}/>
        </div>
      </div>
  );
};

export default StudentDash;

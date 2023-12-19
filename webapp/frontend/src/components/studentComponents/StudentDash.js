import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import Sidebar from "./Sidebar";
import Dash from "./Dash";

export const StudentDash = () => {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  const [Appointment, setAppointment] = useState([]);
  const [DoneAppointment, setDoneAppointment] = useState([]);
  const [Requests, setRequest] = useState([]);
  

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
          const studentAppointments = await axios.get(
            `http://localhost:8080/api/studentappointments/approved/${currentStudentId}`
          );
          setAppointment(studentAppointments.data.appointments);
          const studentRequests = await axios.get(
            `http://localhost:8080/api/studentappointments/pending/${currentStudentId}`
          );
          setRequest(studentRequests.data.appointments);
          const DoneAppointments = await axios.get(
            `http://localhost:8080/api/studentappointments/${currentStudentId}`
          );
          setDoneAppointment(DoneAppointments.data.appointments);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div>
        <Dash
          student={student}
          Appointment={Appointment}
          Requests={Requests}
          DoneAppointment={DoneAppointment}
        />
      </div>
    </div>
  );
};

export default StudentDash;

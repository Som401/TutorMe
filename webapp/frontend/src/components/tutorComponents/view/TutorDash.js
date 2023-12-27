import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import Dash from "../components/Dash";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
//import { useStudentContext } from '../home/StudentContext';
function TutorDash() {
  const [Appointment, setAppointment] = useState([]);
  const [Requests, setRequests] = useState([]);
  const [DoneAppointment, setDoneAppointment] = useState([]);
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student,tutorID);

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

          const tutorResponse = await axios.get(
            `http://localhost:8080/api/tutors/${currentStudentId}`
          );
          setTutorID(tutorResponse.data.TutorID);
          const currentTutorId=tutorID;
          const tutorAppointments = await axios.get(
            `http://localhost:8080/api/appointments/approved/${currentTutorId}`
          );
          setAppointment(tutorAppointments.data.appointments);
          const tutorRequests = await axios.get(
            `http://localhost:8080/api/appointments/pending/${currentTutorId}`
          );
          setRequests(tutorRequests.data.appointments);
          const DoneAppointments = await axios.get(
            `http://localhost:8080/api/appointments/${currentTutorId}`
          );
          setDoneAppointment(DoneAppointments.data.appointments);
          console.log(DoneAppointments.data.appointments,currentTutorId)
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div>
        <Dash student={student} tutorID={tutorID} Appointment={Appointment} DoneAppointment={DoneAppointment} Requests={Requests} />
      </div>
    </div>
  );
}
export default TutorDash;

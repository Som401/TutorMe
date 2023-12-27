import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OneAppointment from "../components/OneAppointment";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const styleImage = {
  width: "20%",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "0",
};
const styleContainer = {
  backgroundColor: "white",
  minHeight: "20vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
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
const styleBar = {
  paddingRight: "15%",
  borderRight: "1px solid white",
  marginLeft: "8%",
};

function Appointments() {
  const [Appointment, setAppointment] = useState([]);
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID,Appointment);

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
          const studentAppointments = await axios.get(
            `http://localhost:8080/api/studentappointments/approved/${currentStudentId}`
          );
          setAppointment(studentAppointments.data.appointments);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID}/>
      </div>
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {Appointment && Appointment.length > 0 && (
            <Navbar
              bg="dark"
              data-bs-theme="dark"
              style={{ width: "70%", margin: "auto", marginTop: "3%" }}
            >
              <Container>
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    justifyContent: "space-between",
                    margin: "auto",
                    gap:"60px"
                  }}
                >
                  <Navbar.Brand style={styleBar}>Date</Navbar.Brand>
                  <Navbar.Brand style={styleBar}>Time</Navbar.Brand>
                  <Navbar.Brand style={styleBar}>Room</Navbar.Brand>
                </div>
              </Container>
            </Navbar>
          )}

          {Appointment.map((elt, index) => (
            <div style={styleContainer}>
              <OneAppointment elt={elt} />
            </div>
          ))}
        </div>
        {Appointment && Appointment.length === 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "30px",
                marginRight: "10%",
              }}
            >
              No appointments at the moment
            </p>
            <img
              style={styleImage}
              src="https://assets-global.website-files.com/5f881c03ca009ec69859eabf/5fec4cbe9eefd2162395e348_no-feature-requests.png"
              alt="Empty Request"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default Appointments;

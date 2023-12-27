import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OneRequest from "../components/OneRequest";
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
  justifyContent: "space-around",
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
  borderRight: "1px solid white",
  marginLeft: "75%",
  marginRight: "22%",
  paddingRight: "30%",
};
function Requests({ tutors }) {
  const [Appointment, setAppointment] = useState([]);
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID, Appointment);

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
          const currentTutorId = tutorID;
          const tutorAppointments = await axios.get(
            `http://localhost:8080/api/appointments/pending/${currentTutorId}`
          );
          setAppointment(tutorAppointments.data.appointments);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);

  const handleDelete = (id, newState) => {
    if (window.confirm("are you sure about your decision")) {
      axios
        .put(`http://localhost:8080/api/appointments/${id}/${newState}`)
        .then((res) => {
          console.log(`Appointment state = ${newState}`);
        })
        .catch((err) => {
          console.error("Error updating appointment:", err);
        });
      setAppointment(Appointment.filter((elt) => elt.AppointmentID !== id));
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} />
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
                    justifyContent: "flex-start",
                    margin: "auto",
                    gap: "130px",
                  }}
                >
                  <Navbar.Brand
                    style={{
                      paddingRight: "8%",
                      borderRight: "1px solid white",
                      margin: "0",
                    }}
                  >
                    Date
                  </Navbar.Brand>
                  <Navbar.Brand
                    style={{
                      paddingRight: "8%",
                      borderRight: "1px solid white",
                      margin: "0",
                    }}
                  >
                    Time
                  </Navbar.Brand>
                  <Navbar.Brand
                    style={{
                      paddingRight: "8%",
                      borderRight: "1px solid white",
                      margin: "0",
                    }}
                  >
                    Room
                  </Navbar.Brand>
                </div>
              </Container>
            </Navbar>
          )}

          {Appointment.map((elt, index) => (
            <div style={styleContainer}>
              <OneRequest elt={elt} handleDelete={handleDelete} />
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
              No requests at the moment
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
export default Requests;

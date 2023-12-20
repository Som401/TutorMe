import Sidebar from "./Sidebar";
import { useState } from "react";
import OneTutor from "./OneTutor";
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

function ApplicationsRequests() {
  const [tutor, setTutor] = useState([]);
  const [student, setStudent] = useState({});
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
            `http://localhost:8080/api/tutors`
          );
          setTutor(tutorResponse.data.tutors);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure about your decision?")) {
      axios.delete(`http://localhost:8080/api/tutors/${id}`)
      .then((res) => {
        console.log(`Tutor deleted successfully`);
        setTutor(tutor.filter((elt) => elt.TutorID !== id));
      })
        .catch((err) => {
          console.error("Error updating Application:", err);
        });
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} />
      </div>
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {tutor && tutor.length > 0 && (
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
                    gap:"0px"
                  }}
                >
                  <Navbar.Brand style={ {paddingRight: "15%",borderRight: "1px solid white",marginRight:"120px"}}>Tutor</Navbar.Brand>
                  <Navbar.Brand style={ {paddingRight: "10%",borderRight: "1px solid white",marginRight:"50px"}}>Subject</Navbar.Brand>
                  <Navbar.Brand style={ {paddingRight: "10%",borderRight: "1px solid white",marginLeft:"0px"}}>Sessions</Navbar.Brand>
                </div>
              </Container>
            </Navbar>
          )}

          {tutor.map((elt, index) => (
            <div style={styleContainer}>
              <OneTutor elt={elt} handleDelete={handleDelete}/>
            </div>
          ))}
        </div>
        {tutor && tutor.length === 0 && (
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
              No Tutors at the moment
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
export default ApplicationsRequests;

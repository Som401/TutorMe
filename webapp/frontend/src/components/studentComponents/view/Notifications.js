import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OneNotif from "../components/OneNotif";
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
  paddingRight: "5%",
  borderRight: "1px solid white",
  marginLeft: "5%",
  marginRight: "9%",
};
function Notifications() {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  const [Request, setRequest] = useState([]);
  
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
          const studentRequestss = await axios.get(
            `http://localhost:8080/api/Requests/${currentStudentId}`
          );
          setRequest(studentRequestss.data.appointments);
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
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {Request && Request.length > 0 && (
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
                    gap:"40px"
                  }}
                >
                  <Navbar.Brand style={ {paddingRight: "8%",borderRight: "1px solid white",marginLeft: "2%",marginRight: "6%"}}>Date</Navbar.Brand>
                  <Navbar.Brand style={{paddingRight: "8%",borderRight: "1px solid white",marginLeft: "6%",marginRight: "6%"}}>Time</Navbar.Brand>
                  <Navbar.Brand style={{paddingRight: "8%",borderRight: "1px solid white",marginLeft: "3%",marginRight: "6%"}}>Room</Navbar.Brand>
                  <Navbar.Brand style={{paddingRight: "8%",borderRight: "1px solid white",marginLeft: "2%"}}>State</Navbar.Brand>
                </div>
              </Container>
            </Navbar>
          )}

          {Request.map((elt, index) => (
            <div style={styleContainer}>
              <OneNotif elt={elt} />
            </div>
          ))}
        </div>
        {Request && Request.length === 0 && (
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
              No notifications at the moment
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
export default Notifications;

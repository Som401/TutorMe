import Sidebar from "./Sidebar";
import { useState } from "react";
import OneSubject from "./OneSubject";
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

function Subjects() {
  const [Subject, setSubject] = useState([]);
  const [Tutor, setTutor] = useState({});
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

          const subjectResponse = await axios.get(
            `http://localhost:8080/api/subjects`,
            {headers}
          );
          setSubject(subjectResponse.data.subjects);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }}
    ;

    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure about your decision?")) {
      axios.delete(`http://localhost:8080/api/subjects/${id}`)
        .then((res) => {
          console.log(`Subject deleted successfully`);
          setSubject(Subject.filter((elt) => elt.SubjectID !== id));
        })
        .catch((err) => {
          console.error("Error deleting subject:", err);
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
          {Subject && Subject.length > 0 && (
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
                    gap:"80px"
                  }}
                >
                  <Navbar.Brand style={ {paddingRight: "8%",borderRight: "1px solid white",margin:"0"}}>Subject</Navbar.Brand>
                  <Navbar.Brand style={ {paddingRight: "8%",borderRight: "1px solid white",margin:"0"}}>Nb tutors</Navbar.Brand>
                  <Navbar.Brand style={ {paddingRight: "8%",borderRight: "1px solid white",margin:"0"}}>Sessions</Navbar.Brand>
                </div>
              </Container>
            </Navbar>
          )}

          {Subject.map((elt, index) => (
            <div style={styleContainer}>
              <OneSubject elt={elt} handleDelete={handleDelete}/>
            </div>
          ))}
        </div>
        {Subject && Subject.length === 0 && (
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
              No Subjects at the moment
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
export default Subjects;

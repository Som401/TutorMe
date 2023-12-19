import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";
function Sidebar({ student, tutorID }) {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const url = `http://localhost:8088/api/students/uploads/${student.StudentID}`;
  
    const formData = new FormData();
    formData.append('file', image); // Use the 'image' state here
  
    axios
      .put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set proper content type for FormData
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle success response as needed
      })
      .catch((error) => {
        console.error('There was an error!', error);
        // Handle error as needed
      });
  };


  const styleSide = {
    borderRight: " 1px solid #DADBE0",
    minHeight: "100vh",
    width: "16%",
    position: "fixed",
    backgroundColor: "#f2f2e6",
  };
  const styleBar = {
    textDecoration: "none",
    color: "black",
    fontFamily: "Gill Sans, sans-serif",
    fontSize: "18px",
    margin: "15px",
  };
  const styleImage = {
    width: "60%",
    margin: "8%",
  };
  const stylelogout = {
    color: "black",
    fontFamily: "Gill Sans, sans-serif",
    fontSize: "18px",
    margin: "15px",
  };
  const navigate = useNavigate();
  const handleSwitch = () => {
    navigate("/TutorDash");
  };
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to SignOut")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div style={styleSide}>
      <Navbar>
        <Container style={{ display: "flex", flexDirection: "column" }}>
          <Navbar.Brand href="#home">Hello, {student.Name}!</Navbar.Brand>
          
          { (
            <Image
              style={styleImage}
              src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/c748bb40780039.578d2ae7b3f4e.jpg"
              roundedCircle
            />
          )}
          <Nav
            className="me-auto"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ minHeight: "60vh" }}>
              <Nav.Link>
                <Link to="/StudentDash" style={styleBar}>
                  StudentDash
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/StudentAppointments" style={styleBar}>
                  Appointments
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Notifications" style={styleBar}>
                  Notifications
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/SearchBar" style={styleBar}>
                  Search Tutor
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/MakeAppointment" style={styleBar}>
                  Make Appointment
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/RateTutor" style={styleBar}>
                  RateTutor
                </Link>
              </Nav.Link>
            </div>
            <div>
              {tutorID !== -1 && (
                <Nav.Link>
                  <Link
                    to="/tutorDash"
                    onClick={handleSwitch}
                    style={stylelogout}
                  >
                    Switch to tutor
                  </Link>
                </Nav.Link>
              )}
              {tutorID === -1 && (
                <Nav.Link>
                  <Link to="/Application" style={styleBar}>
                    Application
                  </Link>
                </Nav.Link>
              )}
              <Nav.Link>
                <Link to="/" onClick={handleSignOut} style={stylelogout}>
                  Logout
                </Link>
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default Sidebar;

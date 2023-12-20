import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Sidebar({ student }) {

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
  console.log(student,student.Name)
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
                <Link to="/AdminDash" style={styleBar}>
                  AdminDash
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/ApplicationRequests" style={styleBar}>
                Applications
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Students" style={styleBar}>
                  Students
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Tutors" style={styleBar}>
                Tutors
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Subjects" style={styleBar}>
                Subjects
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/addsubject" style={styleBar}>
                Add subject
                </Link>
              </Nav.Link>
            </div>
            <div>
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

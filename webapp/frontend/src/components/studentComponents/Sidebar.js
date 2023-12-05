import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from 'axios';

function Sidebar({ student,tutorID}) {
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
          <Image
            style={styleImage}
            src="https://cdn-icons-png.flaticon.com/512/3449/3449633.png"
            roundedCircle
          />
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
             {tutorID!==-1&&<Nav.Link>
                <Link
                  to="/tutorDash"
                  onClick={handleSwitch}
                  style={stylelogout}
                >
                  Switch to tutor
                </Link>
              </Nav.Link>}
             <Nav.Link>
                <Link to="/" onClick={handleSignOut} style={stylelogout}>
                  Logout
                </Link>
              </Nav.Link>
              {tutorID===-1&&<Nav.Link>
                <Link to="/Application" style={styleBar}>
                  Application
                </Link>
              </Nav.Link>}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default Sidebar;

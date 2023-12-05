import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import("./MakeAppointment.css");

const MakeAppointment = () => {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID);

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
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);
  const [formData, setFormData] = useState({
    studentName: "",
    tutorName: "",
    date: "",
    location: "",
    time: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handledateChange = (e) => {
    const { name, value } = e.target;

    // Convert the selectedDate string to a Date object
    const dateObject = new Date(value);

    // Extract year, month, and day from the Date object
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as getMonth() returns zero-based month
    const day = dateObject.getDate().toString().padStart(2, '0'); // Ensure two-digit day format

    // Construct the string in the format year/month/day
    const formattedDate = `${year}-${month}-${day}`;

    // Update the state with the formatted date
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));}
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/appointments";
    axios
      .post(url, formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        console.log(formData)
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("there was an error", error);
      });
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
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div style={styleContainer2}>
        <div
          className="wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <form action="" onSubmit={handlesubmit}>
            <h2>
              Welcome!
              <br />
              <span>ready to schedule an appointment!</span>
            </h2>

            <div className="input-box">
              <label htmlFor="studentName"> Name</label>
              <input
                type="text"
                placeholder="student Name"
                name="studentName"
                id="studentName"
                className="input"
                value={formData.studentName}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="tutorName">Tutor Name:</label>
              <input
                type="text"
                placeholder="Tutor Name"
                name="tutorName"
                id="tutorName"
                className="input"
                value={formData.tutorName}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="tutorName">Time of Session:</label>
              <input
                placeholder="HH:mm"
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                type="text"
                name="time"
                id="time"
                className="input"
                value={formData.time}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="dateOfSession">Date of Session:</label>
              <input
                type="date"
                name="date"
                id="date"
                className="input"
                value={formData.date}
                onChange={handledateChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="placeOfSession">Place of Session:</label>
              <input
                type="text"
                placeholder="Place of Session"
                name="location"
                id="location"
                className="input"
                value={formData.location}
                onChange={handleChange}
              />{" "}
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn">
              Let's go →
            </button>
          </form>
        </div> 
      </div>
    </div>
  );
};
export default MakeAppointment;

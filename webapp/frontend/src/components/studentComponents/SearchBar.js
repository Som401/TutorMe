import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import List from "./List";
import Sidebar from "./Sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

function SearchBar() {
  const [inputText, setInputText] = useState("");
  
  const [Tutors, setTutors] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID,Subjects);

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
          const Subjects = await axios.get(
            `http://localhost:8080/api/subjects`
          );
          setSubjects(Subjects.data.subjects);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);
  const styleContainer2 = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
    justifyContent: "flex-start",
  };

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID}/>
      </div>
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%",}}
        >
          <h1 style={{ display: "flex", justifyContent:"center",marginTop:"4%"}}>Search For Tutor</h1>
          <div className="search" >
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
            />
          </div>
          <List input={inputText} subjects={Subjects}  />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

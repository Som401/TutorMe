import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import List from "./List";
import Sidebar from "./Sidebar";

function SearchBar({student}) {
  const [inputText, setInputText] = useState("");
  // const [tutors, setTutors] = useState([]);

  // useEffect(() => {
  //   const fetchTutors = async () => {
  //     const subject = inputText.toLowerCase();
  //     const response = await fetch(`http://localhost:3001/tutors${subject ? `/${subject}` : ''}`);
  //     const data = await response.json();
  //     setTutors(data.tutors);
  //   };

  //   fetchTutors();
  // }, [inputText]);

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
        <Sidebar student={student} />
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
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

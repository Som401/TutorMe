import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css"
import List from "./List";
import NavBar from "../NavBar";

function SearchBar() {

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
  };

  
  return (
    <>
      <NavBar/>
      <h1>Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
      
      </>
  );
}

export default SearchBar;

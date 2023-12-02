import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import Dash from "./Dash";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

function TutorDash({student}) {
  /*
  const url = "http://localhost:8080/api/students";
  const [student, setStudent] = useState({});
  const [studentId, setStudentId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studentUpdate, setUpdate] = useState({
    Name: "",
    Email: "",
  });
  const reload = () => window.location.reload();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setStudentId(decodedToken.StudentID);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (studentId) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${url}/${studentId}`, { headers })
        .then((res) => {
          setStudent(res.data.student);
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  }, [studentId]);
  const handleChange = (e) => {
    setUpdate({ ...studentUpdate, [e.target.id]: e.target.value });
  };
  /*
const handleUpdate=async(e)=>{
e.preventDefault();
try {
await axios.put(`${url}/${studentId}`, studentUpdate);
} catch (error) {
console.log(error);
}
handleClose();
reload();
};*/
  //
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar tutor={student} />
      </div>
      <div>
        <Dash tutor={student} />
      </div>
    </div>
  );
}
export default TutorDash;

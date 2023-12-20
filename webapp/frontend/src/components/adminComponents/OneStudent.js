import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";

function OneStudent({ elt, handleDelete }) {
  const [DoneAppointment, setDoneAppointment] = useState([]);
  const [tutorID, setTutorID] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DoneAppointments = await axios.get(`http://localhost:8080/api/studentappointments/${elt.StudentID}`);
        setDoneAppointment(DoneAppointments.data.appointments);
        const tutorResponse = await axios.get(
            `http://localhost:8080/api/tutors/${elt.StudentID}`
          );
          setTutorID(tutorResponse.data.TutorID);
      } catch (error) {
        console.error("Token decoding or fetching data error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", width: "70%", borderBottom: "1px solid grey", marginBottom: "1%", padding: "2%", marginTop: "1%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "20px",marginLeft: "20px" }}>{elt.Name}</p>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "20px", marginLeft: "120px" }}>{tutorID===-1 ? <p>False</p> : <p>True</p>}</p>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "20px", marginLeft: "120px" }}>{DoneAppointment.length}</p>
        </div>
        <div style={{ flex: 0 , marginLeft: "10px"}}>
          <Button variant="primary" style={{ backgroundColor: "#BFBCC7", border: "#BFBCC7", opacity: 1, color: "black" }} onClick={() => handleDelete(elt.StudentID)}>Delete</Button>
        </div>
      </div>
    </>
  );
}

export default OneStudent;

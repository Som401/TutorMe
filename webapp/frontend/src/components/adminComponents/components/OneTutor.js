import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function OneApplication({elt,handleDelete}){
    const [student, setStudent] = useState({});
    const [subject, setSubject] = useState({});
    const [DoneAppointment, setDoneAppointment] = useState([]);
    console.log(elt);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const studentResponse = await axios.get(`http://localhost:8080/api/students/${elt.StudentID}`);
            setStudent(studentResponse.data.student);
            const subjectResponse = await axios.get(`http://localhost:8080/api/subjectID/${elt.SubjectID}`);
            setSubject(subjectResponse.data.subject);
            const DoneAppointments = await axios.get(
              `http://localhost:8080/api/appointments/done/${elt.TutorID}`
              
            );
            setDoneAppointment(DoneAppointments.data.appointments);
          } catch (error) {
            console.error("Token decoding or fetching data error:", error);
          }
        };
    
        fetchData(); 
    console.log(student,subject)
        
      }, []); 
    return (
      
      <>
          <div style={{display:"flex",justifyContent:"space-around",width:"70%",borderBottom:"1px solid grey",marginBottom:"1%",padding:"2%",marginTop:"1%"}}>
          <div style={{flex:1,display:"flex",justifyContent:"space-between",gap:"40px"}}>
            <p  style={{fontSize: "20px",marginLeft: "60px"}}>{student.Name}</p>
            </div>
            <div style={{flex: 1}}>
              <p  style={{fontSize: "20px", marginLeft: "80px"}}>{subject.SubjectName}</p>
            </div>
            <div style={{flex: 1}}>
            <p style={{fontSize: "20px",fontSize: "20px", marginLeft: "80px"}}>{DoneAppointment.length}</p>
            </div>
            <div style={{ flex: 0 , marginRight: "30px"}}>
            <Button variant="primary" style={{backgroundColor:"#BFBCC7",border:"#BFBCC7",opacity:1,color:"black"}} onClick={() => handleDelete(elt.TutorID)}>Delete</Button>
            </div>         
          </div>
      </>
    );
  }
  
  export default OneApplication;
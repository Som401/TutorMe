import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function OneApplication({elt,handleDelete}){
    const [student, setStudent] = useState({});
    const [subject, setSubject] = useState({});

    console.log(elt);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const studentResponse = await axios.get(`http://localhost:8080/api/students/${elt.StudentID}`);
            setStudent(studentResponse.data.student);
            const subjectResponse = await axios.get(`http://localhost:8080/api/subjectID/${elt.SubjectID}`);
            setSubject(subjectResponse.data.subject);
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
          <div style={{display:"flex",justifyContent:"space-between",gap:"40px"}}>
            <p  style={{fontSize: "20px"}}>{student.Name}</p>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",gap:"40px"}}>
              <p  style={{fontSize: "20px"}}>{subject.SubjectName}</p>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",gap:"40px"}}>
            <p style={{fontSize: "20px"}}>{elt.SubjectGrade}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"10px",margin:"0px"}}>
            <Button variant="primary" style={{backgroundColor:"#E0E1E5",border:"#E0E1E5",opacity:1,color:"black"}} onClick={() => handleDelete(elt.RequestID, 'approved',elt.StudentID,elt.SubjectID)}>Accept</Button>
            <Button variant="primary" style={{backgroundColor:"#BFBCC7",border:"#BFBCC7",opacity:1,color:"black"}} onClick={() => handleDelete(elt.RequestID, 'declined')}>Deny</Button>
            </div>
            
          </div>
      </>
    );
  }
  
  export default OneApplication;
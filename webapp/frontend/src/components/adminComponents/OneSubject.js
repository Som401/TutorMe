import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function OneSubject({elt,handleDelete}){
    const [tutor, setTutor] = useState({});
    const [Session, setSession] = useState({});
    console.log(elt);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const TurorResnponse = await axios.get(
              `http://localhost:8080/api/tutorsBysubject/${elt.SubjectID}`
            );
            setTutor(TurorResnponse.data.tutors);
            const SessionResnponse = await axios.get(
              `http://localhost:8080/api/appointmentsBysubject/${elt.SubjectID}`
            );
            setSession(SessionResnponse.data.appointments);
          } catch (error) {
            console.error("Token decoding or fetching data error:", error);
          }
        };
    
        fetchData(); 
        console.log(tutor)
        
      }, []); 
    
    return (
      <>
         

          <div style={{display:"flex",justifyContent:"space-around",width:"70%",borderBottom:"1px solid grey",marginBottom:"1%",padding:"2%",marginTop:"1%"}}>
          <div style={{flex:1,display:"flex",justifyContent:"space-between",gap:"40px"}}>
            <p  style={{fontSize: "20px",marginLeft: "60px" }}>{elt.SubjectName}</p>
            </div>
            <div style={{ flex: 1}}>
              <p  style={{fontSize: "20px", marginLeft: "80px"}}>{tutor.length}</p>
            </div>
            <div style={{ flex: 1}}>
            <p style={{fontSize: "20px", marginLeft: "50px"}}>{Session.length} </p>
            </div>
            <div style={{ flex: 0 , marginRight: "30px"}}>
            <Button variant="primary" style={{backgroundColor:"#BFBCC7",border:"#BFBCC7",opacity:1,color:"black"}} onClick={() => handleDelete(elt.SubjectID)}>Delete</Button>
            </div>
            
          </div>
      </>
    );
  }
  
  export default OneSubject;
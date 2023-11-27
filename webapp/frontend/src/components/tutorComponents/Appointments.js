import Sidebar from "./Sidebar";
import { useState } from "react";
import OneAppointment from "./OneAppointment";
import { RequestData } from "../../Data";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const styleImage={
  width:"20%",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "0",
}
const styleContainer = {
  backgroundColor: "white",
  minHeight: "20vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  
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
  const styleBar={
   paddingRight:"15%",
    borderRight:'1px solid white',
    marginLeft:"8%"
  }
  
function Appointments({ tutors }) {
  const [Request, setRequest] = useState(RequestData);

  const [id, setid] = useState("1");
  const selectedTutor = tutors.find((elt) => elt.id === id);
  
  return (
    <div style={{ display: "flex"}}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar tutor={selectedTutor} />
      </div>
      <div style={styleContainer2}>
      <div style={{ display: "flex",flexDirection: "column",width:"100%"}}>
      {Request && Request.length > 0 && <Navbar bg="dark" data-bs-theme="dark" style={{width:"70%",margin:"auto",marginTop:"3%"}} >
        <Container>
          <div style={{ display: "flex",width:"80%",justifyContent:"space-between",margin:"auto"}}>
          <Navbar.Brand style={styleBar}>Date</Navbar.Brand>
          <Navbar.Brand style={styleBar}>Student</Navbar.Brand>
          <Navbar.Brand style={styleBar}>Room</Navbar.Brand>
          </div>
        </Container>
      </Navbar>}
      
        {Request.map((elt,index) => (
          <div style={styleContainer}>
            <OneAppointment  elt={elt} />
          </div>
        ))}
      </div>
        {Request && Request.length === 0 && <div style={{ display: "flex", justifyContent: "center"}}>
        <p style={{display: "flex",flexDirection: "column",justifyContent: "center",fontSize: "30px",marginRight:"10%"}}>No requests at the moment</p>
        <img style={styleImage} src="https://assets-global.website-files.com/5f881c03ca009ec69859eabf/5fec4cbe9eefd2162395e348_no-feature-requests.png" alt="Empty Request" />
        </div>}
      </div>
    </div>
  );
}
export default Appointments;

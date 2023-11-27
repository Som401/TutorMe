import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
function Sidebar({tutor}){

    const styleSide={
        borderRight:" 1px solid #DADBE0",
        minHeight:"100vh",
        width:"16%",
        position:"fixed",
        backgroundColor:"#f2f2e6",

    }
    const styleBar={
        textDecoration:"none",
        color:"black",
        fontFamily:"Gill Sans, sans-serif",
        fontSize:"18px",
        margin:"15px"
      }
    const styleImage={
        width:"60%",
        margin:"8%"
    }
    return(
        <div style={styleSide}>
        <Navbar>
        <Container style={{ display:"flex",flexDirection:"column",}}>
          <Navbar.Brand href="#home">Hello, {tutor.username}!</Navbar.Brand>
          <Image style={styleImage}
          src="https://cdn-icons-png.flaticon.com/512/3449/3449633.png" roundedCircle />
          <Nav className="me-auto" style={{ display:"flex",flexDirection:"column",}}>
            <Nav.Link>
                <Link to="/TutorDash" style={styleBar}>TutorDash</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/Appointments" style={styleBar}>appointment</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/Requests" style={styleBar}>tutoring requests</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </div>
    );
}
export default Sidebar;

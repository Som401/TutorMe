import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavBar() {
    const styleBar={
      textDecoration:"none",
      color:"black",
      fontFamily:"Gill Sans, sans-serif",
      fontSize:"18px",
      margin:"15px"
    }
    const styleTutorMe={
      fontFamily:"serif",
      fontSize:"22px",
      marginRight:"35%",
    }
    const navigate = useNavigate();
    const login = () => {
      navigate(`/Login`);
    };
    return (
        <Navbar bg="white" data-bs-theme="light" style={{position:"fixed",width:"100%"}}>
          <Container>
            <Navbar.Brand style={styleTutorMe}>TutorMe</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link>
                <Link to="/Home" style={styleBar}>Home</Link>
            </Nav.Link>
            <Nav.Link>
             <Link to="/About" style={styleBar}>About</Link>
            </Nav.Link>
            <Nav.Link>
             <Link to="/Team" style={styleBar}>Our Team</Link>
            </Nav.Link>
            </Nav>    
            <button class="button-17" role="button" onClick={login}>Login</button>       
          </Container>
        </Navbar>
    );
  }
  
  export default NavBar;
  
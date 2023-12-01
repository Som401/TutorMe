import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from 'react';
import axios from 'axios';

function Login() {

  const [student, setStudent] = useState({
    Email: "",
    Password: "",
  });
 
  const navigate = useNavigate();

  const handlechange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/login";
    axios
      .post(url, student)
      .then((response) => {
       console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        if(response.data.student.UserType==='student'){
          navigate('/TutorDash');
        }
        else{navigate('/')}
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("there was an error", error);
      });
  };
    
  const styleContainer={
        
    display: "flex",
	  alignItems: "center",
	  justifyContent: "space-evenly",
    backgroundColor:"#f2f2e6",
    minHeight:"92vh",
    position:"absolute",
    top:"9%",
    width:"100%",
}

const styleScreen={ 
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      position: "relative",	
      minHeight: "80vh",
      width: "30%",
      //boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      borderRadius:"15px",
      display: "flex",
      flexDirection:"column",
	    alignItems: "center",
      backgroundColor:"white",
      marginTop:"0%",
}
const styleinput={
    width:"100%",
    marginBottom:"4%",
    marginTop:"4%",
    borderRadius:"7px",
    border:"1px solid  #e1e1ea",
    minHeight:"6vh",

}
const styleLogin={
  fontFamily:"system-ui",
  fontSize:"30px",
  color:"#52527a",
  margin:"6%",

}
const styleLabel={
  fontFamily: "system-ui",
  fontSize:"17px"
}
const styleForm={
  height: "60vh",
  width:"80%",
}
const styleButton={
  width:"100%",
  backgroundColor:"#0D3A68",
  border:"2px solid black",
  fontSize:"18px",
  fontFamily:"Verdana",
  color:"#f2f2e6",
  minHeight:"5vh",
  marginTop:"45%"
}
    const register = () => {
      navigate(`/Register`);
    };
    return (
      <div>
      <div><NavBar/></div>

      
    <div style={styleContainer}>
    <div style={styleScreen}>
    <h3 style={styleLogin}>Login</h3> 
    <Form style={styleForm} onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={styleLabel}>
        <Form.Label style={styleLabel}></Form.Label><br/>
        <Form.Control type="email" name="Email" placeholder='Email' required value={student.email} onChange={handlechange} style={styleinput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={styleLabel}>
        <Form.Label style={styleLabel}></Form.Label><br/>
        <Form.Control type="password" name="Password" placeholder='Password' required value={student.password} onChange={handlechange} style={styleinput} />
      </Form.Group>
      
      <div style={{position:"absolute",width:"80%",bottom:"1%"}}>
      <Button variant="primary" type="submit" style={styleButton}>
        Sign in with email
      </Button>
      <div style={{fontWeight:"500",fontSize:"18px"}}>
      <p style={{textAlign:"center",marginTop:"4%"}}>Not a member yet? 
      <a style={{color:"#0D3A68",marginLeft:"1%",cursor: "pointer"}} onClick={register}>Register</a></p>
      </div>
      </div>
      
    </Form>
      
    </div>
    <div style={{marginTop:"1%"}}>
    <img src="https://favtutor.com/resources/images/banner_front.png"></img>
    </div>
    </div>  
    </div>
    );
  }
  
export default Login;
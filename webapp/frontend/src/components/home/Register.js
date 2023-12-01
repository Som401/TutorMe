import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
function Register() {
  const [student, setStudent] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [ConPass, setPass] = useState({
    password: "",
  });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handlechangePass = ({ currentTarget: input }) => {
    setPass({ ...ConPass, [input.name]: input.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (student.Password !== ConPass.password) {
      alert("Password and Confirm Password do not match");
      // Reset password and confirm password fields
      setStudent({ ...student, Password: "" });
      setPass({ ...ConPass, password: "" });
      return; // Stop further execution
    }
    const url = "http://localhost:8080/api/students";
    axios
      .post(url, student)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("there was an error", error);
      });
  };
  const styleContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f2f2e6",
    minHeight: "92vh",
    position: "absolute",
    top: "9%",
    width: "100%",
    
  };

  const styleScreen = {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    position: "relative",
    minHeight: "80vh",
    width: "30%",
    //boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "0%",
  };
  const styleinput = {
    width: "100%",
    marginBottom:"1%",
    marginTop:"0%",
    borderRadius: "7px",
    border: "1px solid  #e1e1ea",
    minHeight: "6vh"
  };
  const styleRegister = {
    fontFamily: "system-ui",
    fontSize: "30px",
    color: "#52527a",
    margin: "5%",
    marginBottom:"0%",
  };
  const styleLabel = {
    fontFamily: "system-ui",
    fontSize: "17px",
  };
  const styleForm = {
    height: "60vh",
    width: "80%",
  };
  const styleButton = {
    width: "100%",
    backgroundColor: "#0D3A68",
    border: "2px solid black",
    fontSize: "18px",
    fontFamily: "Verdana",
    color: "#f2f2e6",
    minHeight: "5vh",
    marginTop: "1%",
  };
  const login = () => {
    navigate(`/Login`);
  };
  return (
    <div>
      <NavBar/>
      <div style={styleContainer}>
        <div style={styleScreen}>
          <h3 style={styleRegister}>Register</h3>
          <Form style={styleForm} onSubmit={handlesubmit}>
          <div>
            <div>
              <Form.Group
                className="mb-3"
                controlId="formBasicFirstNamename"
                style={styleLabel}
              >
                <Form.Label></Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="Name"
                  placeholder="Name"
                  required
                  value={student.Name}
                  onChange={handlechange}
                  style={styleinput}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={styleLabel}
              >
                <Form.Label></Form.Label>
                <br />
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="Email"
                  required
                  value={student.Email}
                  onChange={handlechange}
                  style={styleinput}
                />
              </Form.Group>
            </div>
            <div>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                style={styleLabel}
              >
                <Form.Label style={styleLabel}></Form.Label>
                <br />
                <Form.Control
                  type="password"
                  name="Password"
                  placeholder="Password"
                  required
                  value={student.Password}
                  onChange={handlechange}
                  style={styleinput}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group
                className="mb-3"
                controlId="formBasicConfirmedPassword"
                style={styleLabel}
              >
                <Form.Label style={styleLabel}></Form.Label>
                <br />
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  required
                  value={ConPass.password}
                  onChange={handlechangePass}
                  style={styleinput}
                />
              </Form.Group>
            </div>
            <div style={{  width: "100%", bottom: "1%" }}>
              <Button variant="primary" type="submit" style={styleButton}>
                Create account
              </Button>
              <div style={{ fontWeight: "500", fontSize: "18px" }}>
                <p style={{ textAlign: "center", marginTop: "4%" }}>
                  Already a member?
                  <a
                    style={{ color: "#0D3A68", marginLeft: "1%" ,cursor: "pointer"}}
                    onClick={login}
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
            </div>
          </Form>
        </div>
        <div style={{ marginTop: "1%" }}>
          <img src="https://favtutor.com/resources/images/banner_front.png"></img>
        </div>
      </div>
    </div>
  );
}

export default Register;

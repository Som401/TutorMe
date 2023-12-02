import Login from "./components/home/Login";
import Home from "./components/home/Home";
import Register from "./components/home/Register";
import TutorDash from "./components/tutorComponents/TutorDash";
import Requests from "./components/tutorComponents/Requests";
import Appointments from "./components/tutorComponents/Appointments";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TutorData } from "./Data";
import About from "./components/home/About";
import PrivateRoute from "./components/home/PrivateRoute";
import "./App.css";
import {  useEffect,useState } from "react";
import StudentDash from './components/studentComponents/StudentDash';
import Notifications from './components/studentComponents/Notifications';
import SearchBar from './components/studentComponents/SearchBar'; 
import MakeAppointment from './components/studentComponents/MakeAppointment';
import RateTutor from './components/studentComponents/RateTutor';
import Application from './components/studentComponents/Application'
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

function App() {
  const [Tutors, setStuden] = useState(TutorData);

  const url = "http://localhost:8080/api/students";
  const [student, setStudent] = useState({});
  const [studentId, setStudentId] = useState(null);
  /*const [tutorID, setTutorID] = useState("");
  const url2 = `http://localhost:8080/api/tutors/${studentId}`;
    useEffect(() => {
      axios
        .get(url)
        .then((res) => {
          setTutorID(res.data.TutorID);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []); 
  }*/
  
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/Appointments"
            element={<Appointments tutors={Tutors} />}
          />
          <Route path="/Register" element={<Register />} />
          
          <Route
            path="/studentDash"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentDash student={student}/>
              </PrivateRoute>
            }
          />
          <Route path="/tutordash" element={<TutorDash student={student}/>} />
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ratetutor" element={<RateTutor student={student}/>} />
          <Route
            path="/Application"
            element={<Application student={student}/>}
          />
          <Route path="/makeappointment" element={<MakeAppointment student={student}/>} />
          <Route path="/SearchBar" element={<SearchBar student={student}/>} />
          <Route path="/Requests" element={<Requests tutors={Tutors} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

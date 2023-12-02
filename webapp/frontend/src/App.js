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
import { useState } from "react";
import StudentDash from './components/studentComponents/StudentDash';
import Notifications from './components/studentComponents/Notifications';
import SearchBar from './components/studentComponents/SearchBar'; 
import MakeAppointment from './components/studentComponents/MakeAppointment';
import RateTutor from './components/studentComponents/RateTutor';
import Application from './components/studentComponents/Application'
function App() {
  const [Tutors, setStudent] = useState(TutorData);
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
            path="/TutorDash"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <TutorDash />
              </PrivateRoute>
            }
          />
          <Route path="/studentdash" element={<StudentDash />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ratetutor" element={<RateTutor />} />
          <Route
            path="/Application"
            element={<Application />}
          />
          <Route path="/makeappointment" element={<MakeAppointment />} />
         {// <Route path="/switchtotutor" element={<TutorDash />} />
         }
          <Route path="/SearchBar" element={<SearchBar />} />
          <Route path="/Requests" element={<Requests tutors={Tutors} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

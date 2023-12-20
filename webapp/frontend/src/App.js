import Login from "./components/home/Login";
import Home from "./components/home/Home";
import Team from "./components/home/Team";
import Register from "./components/home/Register";
import TutorDash from "./components/tutorComponents/TutorDash";
import Requests from "./components/tutorComponents/Requests";
import Appointments from "./components/tutorComponents/Appointments";
import StudentAppointments from "./components/studentComponents/StudentAppointments";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import About from "./components/home/About";
import PrivateRoute from "./components/home/PrivateRoute";
import "./App.css";
import StudentDash from './components/studentComponents/StudentDash';
import Notifications from './components/studentComponents/Notifications';
import SearchBar from './components/studentComponents/SearchBar'; 
import MakeAppointment from './components/studentComponents/MakeAppointment';
import RateTutor from './components/studentComponents/RateTutor';
import Application from './components/studentComponents/Application'
import {StudentProvider} from './components/home/StudentContext';
import AdminDash from './components/adminComponents/AdminDash';
import ApplicationsRequests from './components/adminComponents/ApplicationsRequests';
import Subjects from './components/adminComponents/Subjects';
import Tutors from './components/adminComponents/Tutors';
import Students from './components/adminComponents/Students';
import AddSubject from "./components/adminComponents/AddSubject";
function App() {

  return (
    <div className="App">
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Team" element={<Team />} />

          <Route
            path="/Appointments"
            element={<Appointments/>}
          />
          <Route
            path="/StudentAppointments"
            element={<StudentAppointments/>}
          />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/AdminDash"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDash/>
              </PrivateRoute>
            }
          />
          <Route path="/AddSubject" element={<AddSubject />} />
          <Route path="/ApplicationRequests" element={<ApplicationsRequests />} />
          <Route path="/Subjects" element={<Subjects />} />
          <Route path="/Tutors" element={<Tutors />} />
          <Route path="/Students" element={<Students />} />

          <Route
            path="/studentDash"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentDash/>
              </PrivateRoute>
            }
          />
          <Route path="/tutordash" element={<TutorDash/>} />
          
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ratetutor" element={<RateTutor/>} />
          <Route
            path="/Application"
            element={<Application/>}
          />
          <Route path="/makeappointment" element={<MakeAppointment/>} />
          <Route path="/SearchBar" element={<SearchBar/>} />
          <Route path="/Requests" element={<Requests />} />
        </Routes>
      </BrowserRouter>
      </StudentProvider>
    </div>
  );
}

export default App;

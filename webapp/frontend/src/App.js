import Login from "./components/home/Login";
import Home from "./components/home/Home";
import Team from "./components/home/Team";
import Register from "./components/home/Register";
import TutorDash from "./components/tutorComponents/view/TutorDash";
import Requests from "./components/tutorComponents/view/Requests";
import Appointments from "./components/tutorComponents/view/Appointments";
import StudentAppointments from "./components/studentComponents/view/StudentAppointments";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import About from "./components/home/About";
import PrivateRoute from "./components/home/PrivateRoute";
import "./App.css";
import StudentDash from './components/studentComponents/view/StudentDash';
import Notifications from './components/studentComponents/view/Notifications';
import SearchBar from './components/studentComponents/components/SearchBar'; 
import MakeAppointment from './components/studentComponents/view/MakeAppointment';
import RateTutor from './components/studentComponents/view/RateTutor';
import Application from './components/studentComponents/view/Application'
import {StudentProvider} from './components/home/StudentContext';
import AdminDash from './components/adminComponents/view/AdminDash';
import ApplicationsRequests from './components/adminComponents/view/ApplicationsRequests';
import Subjects from './components/adminComponents/view/Subjects';
import Tutors from './components/adminComponents/view/Tutors';
import Students from './components/adminComponents/view/Students';
import AddSubject from "./components/adminComponents/view/AddSubject";
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

import Login from './components/home/Login';
import Home from './components/home/Home'
import Register from './components/home/Register'
import TutorDash from './components/tutorComponents/TutorDash';
import Requests from './components/tutorComponents/Requests'
import {  Route, Routes,BrowserRouter } from "react-router-dom";
import {TutorData,RequestData} from './Data';
import AddContent from './components/tutorComponents/AddContent'
import Appointments from './components/tutorComponents/Appointments'
import './App.css'
import { useState } from 'react';
function App() {
  const [Tutors,setStudent]=useState(TutorData);
  const [studentId, setStudentId] = useState(null);

  return (
    <div className="App">
    
   <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path= "/Register" element ={<Register/>}/>
    <Route path="/TutorDash" element={<TutorDash tutors={Tutors} />}/>
    <Route path="/Requests" element={<Requests tutors={Tutors}/>}/>
    <Route path="/Appointments" element={<Appointments tutors={Tutors}/>}/>
    <Route path="/AddContent" element={<AddContent tutors={Tutors}/>}/>

    
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

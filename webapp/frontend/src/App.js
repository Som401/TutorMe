import Login from './components/Login';
import Home from './components/Home'
import Register from './components/Register'
import TutorDash from './components/tutorComponents/TutorDash';
import Requests from './components/tutorComponents/Requests'
import {  Route, Routes,BrowserRouter } from "react-router-dom";
import {TutorData,RequestData} from './Data'
import './App.css'
import { useState } from 'react';
function App() {
  const [Tutors,setStudent]=useState(TutorData);
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

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

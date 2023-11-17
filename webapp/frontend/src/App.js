import Login from './components/Login';
import Home from './components/Home'
import Register from './components/Register'
import TutorDash from './components/tutorComponents/TutorDash'
import {  Route, Routes,BrowserRouter } from "react-router-dom";
import './App.css'
function App() {
  const user=localStorage.getItem("token");
  return (
    <div className="App">
    
   <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path= "/Register" element ={<Register/>}/>
    {user&&<Route path="/TutorDash" element={<TutorDash/>}/>}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

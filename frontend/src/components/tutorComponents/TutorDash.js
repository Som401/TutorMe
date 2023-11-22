import Sidebar from './Sidebar';
import { useState } from 'react';
import TutorData from './TutorData';
import Dash from './Dash';

function TutorDash(){
    
    const [data,setTutor]=useState(TutorData);
    const [id,setid]=useState("1");
    const selectedTutor=data.find((elt) => elt.id === id);
    return(
        <div style={{display:"flex"}}>
            <div style={{marginRight:"15%"}}><Sidebar tutor={selectedTutor} /></div>
            <div><Dash tutor={selectedTutor} /> </div>
        </div>
    )
}
export default TutorDash;

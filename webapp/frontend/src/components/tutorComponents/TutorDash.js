import Sidebar from './Sidebar';
import { useState } from 'react';
import Dash from './Dash';

function TutorDash({tutors}){
    
    const [id,setid]=useState("1");
    const selectedTutor=tutors.find((elt) => elt.id === id);
    return(
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{marginRight:"16%" }}>
                <Sidebar tutor={selectedTutor} />
            </div>
            <div>
                <Dash tutor={selectedTutor} />
            </div>
        </div>
    )
}
export default TutorDash;

import React from "react";
import "./Team.css";

const Team = () => {
  const teamMembers = [
    { name: "Yasmine Filali" },
    { name: "Wassim Benzina" },
    { name: "Nada Arfaoui" },
    { name: "Karim Saadaoui" },
    { name: "Mustapha Arfa" },
    { name: "Saif Magouri" },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <div
        style={{
          fontSize: "90px",
          fontWeight: "600",
          color: "#0D3A68",
          fontFamily: "Pacifico,cursive",
          display: "flex",
          justifyContent: "center"
        }}
      >
        Our Team
      </div>
      <div style={{display:"flex",justifyContent:"center"}} className="Team-container">
        <div className="Team-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="Team">
              <h2>{member.name}</h2>
            </div>
          ))}
        </div>
        </div>
      </div>
    
  );
};

export default Team;

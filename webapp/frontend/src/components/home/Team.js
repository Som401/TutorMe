import React from "react";
import NavBar from './NavBar';
import Footer from './Footer';
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
    <div>
    <NavBar/>
    <div style={{display:"flex",flexDirection:"column", alignItems: "center", padding: '60px',minHeight:"100vh" }}>
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
      <Footer/>
      </div>
  );
};

export default Team;

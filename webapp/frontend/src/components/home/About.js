import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: '60px',minHeight:"100vh" }}>
        <div style={{ flex: 1, marginRight: '50px' }}>
        <div style={{ 
            fontSize: "90px",
            fontWeight: "600",
            marginBottom: "40px",
            color: "#0D3A68",
            fontFamily: 'Pacifico,cursive', 
          }}>
            Looking for a Tutor ?
          </div>
          
          <p style={{
            fontSize: "22px",
            lineHeight: '1.6',
            color: '#2C3E50', 
            marginBottom: '20px',
            textAlign: 'justify', 
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)', 
            fontFamily: 'Arial, sans-serif', 
            }}>
            At TutorMe, we're on a mission to create a collaborative learning hub where dedicated tutors connect with students at all academic levels. 
            Our seamless and personalized tutoring experience is designed to empower you through challenging courses, exam preparation, 
            or specific subject assistance. Join our vibrant community for peer-supported education that boosts self-esteem, sparks curiosity, 
            and drives academic achievement. Together, let's achieve unparalleled success!
            </p>

        </div>
        <div style={{ width: "45%", minWidth: "100px" }}>
            <img
                src="https://favtutor.com/resources/images/hire_dev_pic_mobile.png"
                alt="Mobile Development"
                style={{ width: '100%', height: 'auto', boxShadow: 'none' }}
            />
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default About;
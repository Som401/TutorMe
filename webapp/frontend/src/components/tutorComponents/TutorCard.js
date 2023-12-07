import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./TutorCard.css"
import { useEffect,useState } from 'react';

import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faUser} from "@fortawesome/free-brands-svg-icons";


function TutorCard({ tutor }) {

  const [DoneAppointment, setDoneAppointment] = useState([]);
  const [Rating,setRating]=useState([]);
  const copyEmailToClipboard = () => {
    const tutorEmail = tutor.Email; // Replace 'email' with the key for the tutor's email in your data

    navigator.clipboard.writeText(tutorEmail)
      .then(() => {
        alert(`Tutor's email (${tutorEmail}) copied to clipboard!`);
      })
      .catch((error) => {
        console.error('Error copying email to clipboard:', error);
        alert('Failed to copy email to clipboard.');
      });
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
         
          const DoneAppointments = await axios.get(
            `http://localhost:8080/api/appointments/${tutor.TutorID}`
          );
          setDoneAppointment(DoneAppointments.data.appointments);
          const ratings = await axios.get(
            `http://localhost:8080/api/appointments/${tutor.TutorID}`
          );
          setDoneAppointment(DoneAppointments.data.appointments);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
    };
    fetchData();
  }, []);


  const image= "https://mir-s3-cdn-cf.behance.net/project_modules/hd/c748bb40780039.578d2ae7b3f4e.jpg";
  const stars=[...Array(5)].map((item,i) => {
    return (<sapn style={{color:tutor.rating>=i? "gold": "gray"}}>☆</sapn>)
  })

  return (
    <div class='tutorcard'>
    <Card className='main'>
      <Card.Img variant="top" className="card-img" src={image} />
      <Card.Body>
        <Card.Title className='title'>{tutor.Name}</Card.Title>

        <Card.Text className='subject'>
          <strong>Subject:</strong> {tutor.SubjectName}
        </Card.Text>
        
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>{stars}</strong> 
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Ex Students:</strong> {DoneAppointment.length}
        </ListGroup.Item>
      </ListGroup>

      <Card.Body className='duration'>
        <Card.Link href="#" onClick={copyEmailToClipboard} className='req'>Copy Tutor Email</Card.Link>
      </Card.Body>

    </Card>
    </div>
  );
}

export default TutorCard;

import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./TutorCard.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faUser} from "@fortawesome/free-brands-svg-icons";


function TutorCard({ tutor }) {
  const stars=[...Array(5)].map((item,i) => {

    return (<sapn style={{color:tutor.rating>=i? "gold": "gray"}}>☆</sapn>)
  })
  return (
    <div class='tutorcard'>
    <Card className='main'>
      <Card.Img variant="top" className="card-img" src={tutor.image} />
      <Card.Body>
        <Card.Title className='title'>{tutor.username}</Card.Title>

        <Card.Text className='subject'>
          <strong>Subject:</strong> {tutor.subject}
        </Card.Text>
        
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>{stars}</strong> 
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Ex Students:</strong> {tutor.nb_ex_student}
        </ListGroup.Item>
      </ListGroup>

      <Card.Body className='duration'>
        <Card.Link href="#" className='req'>Request Appointment</Card.Link>
      </Card.Body>

    </Card>
    </div>
  );
}

export default TutorCard;

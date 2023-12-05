import React, { useState } from 'react';
import TutorData from '../tutorComponents/TutorData.js'; 
import TutorCard from '../tutorComponents/TutorCard';
import { useEffect } from 'react';
import '../tutorComponents/TutorCard.css';
import './List.css';
import axios from "axios";

function List({subjects,input}) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [tutors, setTutors] = useState([]);
  console.log(tutors)
  useEffect(() => {
    const fetchData = async () => {
      
        try {
          const tutor = await axios.get(
            `http://localhost:8080/api/tutors`);
            setTutors(tutor.data.tutors);
        } catch (error) {
          console.error("error on getting tutors:", error);
        }
      }
      fetchData();
    },[]
  );

  const uniqueSubjects = [...new Set(subjects.map((el) => el.SubjectName))];
  console.log(uniqueSubjects)
  
  const filteredSubjects = uniqueSubjects.filter((subject) => {
    if (input === '') {
      return true; 
    } else {
      return subject.toLowerCase().includes(input.toLowerCase());
    }
  });

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div>
      <ul className='listOFsubjects'>
        {filteredSubjects.map((subject, index) => (
          <li className='subjects' key={index} onClick={() => handleSubjectClick(subject)}>
            {subject}
          </li>
        ))}
      </ul>

      <div className="tutor-card-container">
        {tutors.filter((tutor) => tutor.SubjectName.toLowerCase() === selectedSubject.toLowerCase()).map((tutor) => (
          <TutorCard key={tutor.TutorID} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

export default List;

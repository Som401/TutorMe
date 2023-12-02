import React, { useState } from 'react';
import TutorData from '../tutorComponents/TutorData.js'; 
import TutorCard from '../tutorComponents/TutorCard';
import '../tutorComponents/TutorCard.css';
import './List.css';

function List(props) {
  const [selectedSubject, setSelectedSubject] = useState('');

  const uniqueSubjects = [...new Set(TutorData.map((el) => el.subject))];

  const filteredSubjects = uniqueSubjects.filter((subject) => {
    if (props.input === '') {
      return true; 
    } else {
      return subject.toLowerCase().includes(props.input.toLowerCase());
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
        {TutorData.filter((tutor) => tutor.subject.toLowerCase() === selectedSubject.toLowerCase()).map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

export default List;

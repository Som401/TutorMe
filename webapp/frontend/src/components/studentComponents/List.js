import React from 'react';
import TutorData from '../tutorComponents/TutorData';
import TutorCard from '../tutorComponents/TutorCard'; 

function List(props) {
  const filteredData = TutorData.filter((el) => {
    const subject = el.subject ? el.subject.toLowerCase() : '';

    if (props.input === '') {
      return el;
    } else {
      return subject.includes(props.input);
    }
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginRight: '20px' }}>
      {filteredData.map((item) => (
        <TutorCard key={item.id} tutor={item} style={{ margin: '10px' }} />
      ))}
    </div>
  );
}

export default List;

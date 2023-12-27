import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student,tutorID);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentStudentId = decodedToken.StudentID;

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const studentResponse = await axios.get(`http://localhost:8080/api/students/${currentStudentId}`, { headers });
          setStudent(studentResponse.data.student);

          const tutorResponse = await axios.get(`http://localhost:8080/api/tutors/${currentStudentId}`);
          setTutorID(tutorResponse.data.TutorID);
        } catch (error) {
          console.error('Token decoding or fetching data error:', error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <StudentContext.Provider value={{ student, tutorID }}>
      {children}
    </StudentContext.Provider>
  );
};

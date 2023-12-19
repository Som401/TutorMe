import "./MakeAppointment.css";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

const RateTutor = () => {
  const [formData, setFormData] = useState({
    tutorEmail: "",
    studentEmail: "",
    rating: 0,
  });

  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentStudentId = decodedToken.StudentID;

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const studentResponse = await axios.get(
            `http://localhost:8080/api/students/${currentStudentId}`,
            { headers }
          );
          setStudent(studentResponse.data.student);

          const tutorResponse = await axios.get(
            `http://localhost:8080/api/tutors/${currentStudentId}`
          );
          setTutorID(tutorResponse.data.TutorID);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID);
  }, [tutorID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rating, tutorEmail, studentEmail } = formData;

    const ratingExists = await axios.get(`http://localhost:8080/api/ratings/${tutorEmail}/${studentEmail}`);

  if (ratingExists.data) {
    console.log(ratingExists.data,`http://localhost:8080/api/ratings/${tutorEmail}/${studentEmail}`)
    const existingRatingId = ratingExists.data.rateID; 
    const updateUrl = `http://localhost:8080/api/ratings/${existingRatingId}`;
    axios
      .put(updateUrl, { rating })
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        console.log(formData);
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("There was an error", error);
      });
  } else {
    const createUrl = "http://localhost:8080/api/ratings";
    axios
      .post(createUrl, formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        console.log(formData);
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("There was an error", error);
      });
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const styleContainer2 = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div style={styleContainer2}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div className="wrapper">
            <form action="" onSubmit={handleSubmit}>
              <h2>
                Welcome!
                <br />
                <span>Give us your feedback</span>
              </h2>

              <div className="input-box">
                <label htmlFor="studentName">Your Email</label>
                <input
                  type="text"
                  placeholder="Your Email"
                  name="studentEmail"
                  id="studentEmail"
                  className="input"
                  value={formData.studentEmail}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Tutor Name */}
              <div className="input-box">
                <label htmlFor="tutorName">Tutor Email:</label>
                <input
                  type="text"
                  placeholder="Tutor Email"
                  name="tutorEmail"
                  id="tutorEmail"
                  className="input"
                  value={formData.tutorEmail}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Rating */}
              <div className="rating">
                <label>Rating:</label>
                {[1,2,3,4,5].map((value) => (
                  <React.Fragment key={value}>
                    <input
                      value={value}
                      name="rating"
                      id={`star${value}`}
                      type="radio"
                      onChange={() => handleRatingChange(value)}
                    />
                    <label htmlFor={`star${value}`}></label>
                  </React.Fragment>
                ))}
                <i className="bx bxs-user"></i>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn">
                Let's go →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateTutor;

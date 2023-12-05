import "./MakeAppointment.css";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const RateTutor = ({student}) => {
  const [formData, setFormData] = useState({
    tutorName: "",
    subject: "",
    dateOfSession: "",
    placeOfSession: "",
    rating: 1,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Form submitted!");
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
        <Sidebar student={student}/>
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

              {/* Tutor Name */}
              <div className="input-box">
                <label htmlFor="tutorName">Tutor Name:</label>
                <input
                  type="text"
                  placeholder="Tutor Name"
                  name="tutorName"
                  id="tutorName"
                  className="input"
                  value={formData.tutorName}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Subject */}
              <div className="input-box">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  id="subject"
                  className="input"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Date of Session */}
              <div className="input-box">
                <label htmlFor="dateOfSession">Date of Session:</label>
                <input
                  type="date"
                  name="dateOfSession"
                  id="dateOfSession"
                  className="input"
                  value={formData.dateOfSession}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Place of Session */}
              <div className="input-box">
                <label htmlFor="placeOfSession">Place of Session:</label>
                <input
                  type="text"
                  placeholder="Place of Session"
                  name="placeOfSession"
                  id="placeOfSession"
                  className="input"
                  value={formData.placeOfSession}
                  onChange={handleChange}
                />
                <i className="bx bxs-user"></i>
              </div>

              {/* Rating */}
              <div className="rating">
                <label>Rating:</label>
                {[5, 4, 3, 2, 1].map((value) => (
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

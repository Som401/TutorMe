import React, { useState } from "react";
import "./MakeAppointment";
import Sidebar from "./Sidebar";

const TutoringReqApplication = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectGrade, setSubjectGrade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Subject:", subject);
    console.log("Subject Grade:", subjectGrade);
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
        <Sidebar/>
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
                <span>Send your request now</span>
              </h2>

              <div className="input-box">
                <label className="sub_title" htmlFor="studentName">
                  Name of student
                </label>
                <input
                  placeholder="Enter your name"
                  className="form_style"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <label className="sub_title" htmlFor="subjectName">
                  Subject name
                </label>
                <input
                  placeholder="Enter the subject name"
                  className="form_style"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div className="input-box">
                <label className="sub_title" htmlFor="subjectGrade">
                  Subject grade
                </label>
                <input
                  placeholder="Enter your subject grade"
                  className="form_style"
                  type="text"
                  value={subjectGrade}
                  onChange={(e) => setSubjectGrade(e.target.value)}
                />
                <i className="bx bxs-user"></i>
              </div>

              <div>
                <button className="btn" type="submit">
                  APPLY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringReqApplication;

import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar({ Appointment }) {
  
  const events = Appointment.map((appt) => {
    return {
      start: new Date(appt.Date), // Assuming appt.Date contains the date for the appointment
      // Add other properties as needed, such as location, description, etc.
    };
  });
  
  return (
    <div style={{ width: "80%" }}>
      <Fullcalendar
        plugins={[dayGridPlugin]}
        initialView={"dayGridMonth"}
        height={"90vh"}
       events={events}
      />
    </div>
  );
}

export default Calendar;

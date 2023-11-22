import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";
//import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const events = [
    { title: 'app1', start: new Date('November 17, 2023 10:00') },
    { title: 'app2', start: new Date('November 29, 2023 16:15') }
  ]
  return (
    <div style={{width:"80%"}}>
      <Fullcalendar
        plugins={[dayGridPlugin]}
        initialView={"dayGridMonth"}
        height={"90vh"}
        events = {events}
      
      />
    </div>
  );
}

export default Calendar;
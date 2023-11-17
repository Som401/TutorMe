import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";
//import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  return (
    <div style={{width:"80%"}}>
      <Fullcalendar
        plugins={[dayGridPlugin]}
        initialView={"dayGridMonth"}
        height={"90vh"}
        
      />
    </div>
  );
}

export default Calendar;
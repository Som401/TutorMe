function OneAppointment({elt}){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const dateRequest = new Date(elt.Date);
    return (
      <>    
          <div style={{display:"flex",justifyContent:"space-around",width:"70%",borderBottom:"1px solid grey",marginBottom:"1%",padding:"2%",marginTop:"1%"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <h4 style={{fontSize: "40px",display:"flex",justifyContent:"center"}} >{dateRequest.getDate()}</h4>
                <h5 tyle={{fontSize: "25px",display:"flex",justifyContent:"center"}}>{month[dateRequest.getMonth()]}</h5>
            </div>
            <div style={{}}>
            <div>
            <p  style={{fontSize: "20px"}}>{elt.studentname}</p>
            <p  style={{fontSize: "20px"}}>{dateRequest.getHours()}:{(dateRequest.getMinutes()<10?'0':'' )+dateRequest.getMinutes()} - {dateRequest.getHours()+1}:{(dateRequest.getMinutes()<10?'0':'' )+dateRequest.getMinutes()}</p>
            </div>
            </div>
            <div style={{}}>
            <p style={{fontSize: "20px"}}>{elt.Location}</p>
            </div>
            
          </div>
      </>
    );
  }
  
  export default OneAppointment;
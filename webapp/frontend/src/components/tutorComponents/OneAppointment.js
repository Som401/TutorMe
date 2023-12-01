function OneAppointment({elt}){
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 
  return (
    <>
        <div style={{display:"flex",justifyContent:"space-around",width:"70%",borderBottom:"1px solid grey",marginBottom:"1%",padding:"2%",marginTop:"1%"}}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <h4 style={{fontSize: "40px",display:"flex",justifyContent:"center"}} >{elt.dateRequest.getDate()}</h4>
              <h5 tyle={{fontSize: "25px",display:"flex",justifyContent:"center"}}>{month[elt.dateRequest.getMonth()]}</h5>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",gap:"40px"}}>
          <div>
          <p  style={{fontSize: "20px"}}>{elt.studentname}</p>
          <p  style={{fontSize: "20px"}}>{elt.dateRequest.getHours()}:{(elt.dateRequest.getMinutes()<10?'0':'' )+elt.dateRequest.getMinutes()} - {elt.dateRequest.getHours()+1}:{(elt.dateRequest.getMinutes()<10?'0':'' )+elt.dateRequest.getMinutes()}</p>
          </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",gap:"40px"}}>
          <p style={{fontSize: "20px"}}>{elt.place}</p>
          </div>
          
        </div>
    </>
  );
}

export default OneAppointment;
import Sidebar from "./Sidebar";
import { useState } from "react";
import OneRequest from "./OneRequest";
import { RequestData } from "../../Data";

const styleContainer = {
  backgroundColor: "white",
  minHeight: "50vh",
  width: "100%",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "0",
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
function Requests({ tutors }) {
  const [Request, setRequest] = useState(RequestData);

  const [id, setid] = useState("1");
  const selectedTutor = tutors.find((elt) => elt.id === id);
  const handleDelete = (id) => {
    if (window.confirm("are you sure about your decision")) {
      /* axios
          .delete(`${url}/${id}`)
          .then((res)=>{
        })
        .catch((err)=>{
            console.log(err);
        })*/
      setRequest(Request.filter((elt) => elt.id !== id));
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar tutor={selectedTutor} />
      </div>
      <div style={styleContainer2}>
      <div style={{ display: "flex", flexDirection: "column",width:"100%"}}>
        {Request.map((elt,index) => (
          <div style={styleContainer}>
            <OneRequest elt={elt} index={index} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
export default Requests;

import Sidebar from "./Sidebar";

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
function template() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar tutor={selectedTutor} />
      </div>
      <div style={styleContainer2}>
      <div style={{ display: "flex",flexDirection: "column",width:"100%"}}>
      
      </div>
      </div>
    </div>
  );
}
export default template;

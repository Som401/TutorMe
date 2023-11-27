import image1 from "../../assets/image1.jpg";
import Card from "react-bootstrap/Card";
import Calendar from "../home/Calendar";
import DateTime from "../home/DateTime";
function Dash({ tutor }) {
  const styleContainer = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    //border: "2px solid red",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
  };
  const styleImage = {
    borderRadius: "8px",
    width: "100%",
    height: "100%",
  };
  const styleImageDiv = {
    borderRadius: "8px",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    marginBottom: "2%",
    //border:"2px solid red",
    marginTop: "4%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "4%",
  };
  const styleDate = {
    position: "absolute",
    top: "40%",
    right: "10%",
    fontSize: "22px",
  };
  const styleTime = {
    position: "absolute",
    top: "50%",
    right: "10%",
    fontSize: "22px",
  };
  const styleBoxcontainer = {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    gap: "2%",
    marginBottom: "4%",
  };
  const styleBox = {
    border: "#E6E5E1",
    backgroundColor: "#E6E5E1",
    width: "100%",
    height: "100%",
  };
  const styleBox2 = {
    border: "#E0E1E5",
    backgroundColor: "#E0E1E5",
    width: "100%",
    height: "100%",
  };
  const styleBox3 = {
    border: "#BFBCC7",
    backgroundColor: "#BFBCC7",
    width: "100%",
    height: "100%",
  };
  const styleIcon = {
    position: "absolute",
    width: "10%",
    right: "0%",
    bottom: "0%",
  };
  const d = new Date();
  const showTime = d.getHours() + ":" + d.getMinutes();
  return (
    <div style={styleContainer}>
      <div style={styleImageDiv}>
        <img style={styleImage} src={image1}></img>
        <div style={styleDate}>
          <DateTime />
        </div>
      </div>
      <div style={styleBoxcontainer}>
        <Card style={styleBox}>
          <Card.Body>
            <Card.Title>Current Students:</Card.Title>
            <Card.Text style={{ fontSize: "18px" }}>
              {tutor.nb_appointments}
            </Card.Text>
            <div style={{ position: "relative" }}>
              <img
                style={styleIcon}
                src="https://static.thenounproject.com/png/1161015-200.png"
              ></img>
            </div>
          </Card.Body>
        </Card>
        <Card style={styleBox2}>
          <Card.Body>
            <Card.Title>Current requests:</Card.Title>
            <Card.Text style={{ fontSize: "18px" }}>
              {tutor.nb_requests}
            </Card.Text>
            <div style={{ position: "relative" }}>
              <img
                style={styleIcon}
                src="https://static.thenounproject.com/png/1161015-200.png"
              ></img>
            </div>
          </Card.Body>
        </Card>
        <Card style={styleBox3}>
          <Card.Body>
            <Card.Title>Ex students:</Card.Title>
            <Card.Text style={{ fontSize: "18px" }}>
              {tutor.nb_ex_student}
            </Card.Text>
            <div style={{ position: "relative" }}>
              <img
                style={styleIcon}
                src="https://static.thenounproject.com/png/1161015-200.png"
              ></img>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div
        style={{
          width: "100%",
          marginBottom: "4%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Calendar />
      </div>
    </div>
  );
}
export default Dash;

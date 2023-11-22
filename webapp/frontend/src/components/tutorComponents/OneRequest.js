import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function OneRequest({elt,index,handleDelete}){
  const deleteRequest = () => {
    handleDelete(elt.id);
  };
  return (
    <>
    <Card className="text-center" style={{width:"40%"}}>
      <Card.Header>Request {index+1}</Card.Header>
      <Card.Body>
        <Card.Text>
            You have appointment request from {elt.studentname}!<br/>
            {elt.studentname} wants to meet you  {elt.dateRequest.getDate()}/{elt.dateRequest.getMonth()} in {elt.place}       
        </Card.Text>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <Button variant="primary" style={{backgroundColor:"#E0E1E5",border:"#E0E1E5",opacity:1,color:"black"}} onClick={deleteRequest}>Accept</Button>
        <Button variant="primary" style={{backgroundColor:"#BFBCC7",border:"#BFBCC7",opacity:1,color:"black"}}onClick={deleteRequest}>Deny</Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </>
  );
}

export default OneRequest;
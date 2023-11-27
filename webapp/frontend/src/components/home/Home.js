import NavBar from "./NavBar";
import Footer from "./Footer";

function Home(){
    
    return(
        <div>
        <NavBar/>

        <div style={{display:"flex",justifyContent:"space-evenly",alignItems: "center"}}>
            <div style={{}}>
                <div style={{fontSize: "20px",fontWeight: "500",marginBottom:"5%"}}>Get your best tutor from here</div>
                <h1 style={{fontSize: "70px",fontWeight: "bold"}}>Build Your</h1>
                <div style={{fontSize: "70px",color:"#0D3A68",fontWeight: "bold"}}>better result</div>
            </div>
            <div style={{marginTop:"8%",width:"600px"}}>
                <img src="https://favtutor.com/resources/images/banner_front.png"></img>
            </div>

        </div>
        <Footer/>

        </div>
        );
}

export default Home;
const express=require("express");
const studentRoute=require("./Routes/studentRoute");
const authRoute=require("./Routes/authRoute")
const {connectDb}=require("./configuration/connectDb")
const dotenv=require("dotenv");
const app=express();
dotenv.config();

const port=process.env.PORT
connectDb();

app.listen(port, (error)=>{
    if(error){
        console.log("Server Failed")
    }
    else{ 
        console.log(`Server Started on port ${port}`)
    }
});

app.use(express.json());
app.use("/api", studentRoute);
app.use("/api", authRoute);


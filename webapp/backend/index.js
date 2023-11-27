const express = require("express");
const studentRoute = require("./routes/studentRoute");
const { connectDb } = require("./configuration/connectDb");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({
  //origin:["http://localhost:3000"],
  //methods:["POST","GET"],
  //credentials:true
}));
//app.use(cookieParser());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
connectDb();

app.listen(port, (er) => {
  if (er) {
    console.log(er);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
app.use("/api", studentRoute);

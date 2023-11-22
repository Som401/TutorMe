const {connectDb}  = require("../configuration/connectDb").connectDb;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM student WHERE Email = ?";

  
connectDb.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("email already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

   
    const q =
      "INSERT INTO student (`Email`, `Name`, `Password`) VALUE (?)";

    const values = [
      req.body.Email,
      req.body.Name,
      hashedPassword,
    ];

    
connectDb.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM student WHERE Email = ?";

  
connectDb .query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.Password,
      data[0].Password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or email!");

    const token = jwt.sign({ id: data[0].StudentID }, "secretkey");

    const { Password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = {
  register,
  login,
  logout,
};

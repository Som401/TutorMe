const db = require("../configuration/connectDb").db;
const jwt = require("jsonwebtoken");

const getStudents = (req, res) => {
  const studentId = req.params.StudentID;
  const q = "SELECT * FROM student WHERE StudentID=?";

  db.query(q, [studentId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { Password, ...info } = data[0];
    return res.json(info);
  });
};

const putStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, studentsInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE student SET `Name`=?,`academicLevel`=?,`profilePic`=? WHERE StudentID=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        studentsInfo.StudentID,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

module.exports = {
  getStudents,
  putStudent
};

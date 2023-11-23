const sequelize = require("../configuration/connectDb");
//const jwt = require("jsonwebtoken");
const Student=require("../models/Student");
//const bcrypt = require("bcrypt");

const getStudents = async (requset, response) => {
try {
const students = await Student.findAll();
response.status(200).json({ students: students });
} catch (error) {
response.status(500).json({ msg: "error on getting students" });
}
};

const getOneStudent = async (req, res) => {
const id = req.params.id;
try {
const foundStudent = await Student.findByPk(id);
if (foundStudent) {
res.status(200).json({ student: foundStudent });
} else {
res.status(404).json({ msg: "Student not found" });
}
} catch (error) {
console.error("Error on getting one student:", error);
res
.status(500)
.json({ msg: "Error on getting one student", error: error.message });
}
};

const postStudent = async (request, response) => {
try {
const newStudent = request.body;
const createdStudent = await Student.create(newStudent);
response.status(200).json({ student: createdStudent, msg: " Student addedsuccessfully" });
} catch (error) {
console.error("Error on adding student:", error);
response
.status(500)
.json({ msg: "Error on adding student", error: error.message });
}
};

const putStudent = async (req, res) => {
const id = req.params.id;
const updatedData = req.body;
try {
const [updateCount] = await Student.update(updatedData, {
where: { id: id },
});
if (updateCount > 0) {
res.status(200).json({ msg: "Student updated successfully" });
} else {
res.status(404).json({ msg: "Student not found" });
}
} catch (error) {
res
.status(500)
.json({ msg: "Error on updating student", error: error.message });
}
};
const deleteStudent = async (req, res) => {
const id = req.params.id;
try {
const deleteCount = await Student.destroy({
where: { id: id },
});
if (deleteCount > 0) {
res.status(200).json({ msg: "Student deleted successfully" });
} else {
res.status(404).json({ msg: "Student not found" });
}
} catch (error) {
console.error("Error on deleting student:", error);
res
.status(500)
.json({ msg: "Error on deleting student", error: error.message });
}
};
module.exports = { postStudent, getStudents, getOneStudent, putStudent, deleteStudent };

/*const postStudent = async (request, response) => {
  try {
    const { error } = validate(req.body);
    if (error)
			return res.status(400).send({ message: error.details[0].message });
      const student = await Student.findOne({ Email: req.body.Email });
      if (student)
        return res
          .status(409)
          .send({ message: "Student with given email already Exist!" });
         // const salt = await bcrypt.genSalt(Number(process.env.SALT));
          //const hashPassword = await bcrypt.hash(req.body.Password, salt);
          //		await new User({ ...req.body, password: hashPassword }).save();
          //		res.status(201).send({ message: "User created successfully" });

          const newStudent = request.body;
    const createdStudent = await User.create(newStudent);
 
    response.status(200).json({ student: createdStudent, msg: "Student addedsuccessfully" });
  } catch (error) {
  console.error("Error on adding student:", error);
  response
  .status(500)
  .json({ msg: "Error on adding student", error: error.message });
  }
  };

const getStudents = async (req, res) => {
  try {
    const students = await sequelize.query('SELECT * FROM students');
    res.status(200).json({students:students}); 
  } catch (err) {
    res.status(500).send(err);
  }
}


const putStudent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, studentsInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE student SET `Name`=?,`academicLevel`=?,`profilePic`=? WHERE StudentID=? ";

    sequelize.query(
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
  putStudent,
  postStudent
};
*/
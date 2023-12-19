const { sequelize } = require("../configuration/connectDb");
require("dotenv").config();
const Appointment = require("../models/Appointment");
const Student = require("../models/Student");
const Tutor = require("../models/Tutor");

const { QueryTypes,Sequelize } = require("sequelize");

const getAppointmentsbyTutorId = async (request, response) => {
  const { state,tutorID } = request.params; 

  try {
    const appointments = await sequelize.query(
      'SELECT * FROM appointments WHERE State = :stateValue and TutorID = :tutorID  ORDER BY Date ASC', // Assuming `state` is the correct column name
      {
        replacements: { stateValue: state ,tutorID:tutorID }, // Use a different replacement key to avoid conflicts
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(500).json({ msg: "Error on getting appointments", error: error.message });
  }
};

const getAppointmentsbyStudentId = async (request, response) => {
  const { state,studentID } = request.params; 

  try {
    const appointments = await sequelize.query(
      'SELECT * FROM appointments WHERE State = :stateValue and StudentID = :studentID  ORDER BY Date ASC', // Assuming `state` is the correct column name
      {
        replacements: { stateValue: state ,studentID:studentID }, // Use a different replacement key to avoid conflicts
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(500).json({ msg: "Error on getting appointments", error: error.message });
  }
};

const getAppointmentsByStudentId2 = async (request, response) => {
  const { studentID } = request.params;

  try {
    const appointments = await sequelize.query(
      'SELECT * FROM appointments WHERE State IN (:pending, :denied) AND StudentID = :studentID ORDER BY Date ASC',
      {
        replacements: { pending: 'pending', denied: 'denied', studentID: studentID },
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(500).json({ msg: "Error on getting appointments", error: error.message });
  }
};


const getExstudents = async (request, response) => {
  const { tutorID } = request.params; 

  try {
    const appointments = await sequelize.query(
      'SELECT DISTINCT StudentID FROM appointments WHERE State = :state AND TutorID = :tutorID', 
      {
        replacements: { state: 'done', tutorID: tutorID }, 
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(500).json({ msg: "Error on getting appointments", error: error.message });
  }
};

const getDoneAppointments = async (request, response) => {
  const { studentID } = request.params; 

  try {
    const appointments = await sequelize.query(
      'SELECT * FROM appointments WHERE State = :state AND StudentID = :studentID', 
      {
        replacements: { state: 'done', studentID: studentID }, 
        type: QueryTypes.SELECT,
      }
    );

    response.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    response.status(500).json({ msg: "Error on getting appointments", error: error.message });
  }
};

const postAppointment = async (request, response) => {
  try {
    const { time, location, tutorEmail, studentEmail, date } = request.body;

    const [hours, minutes] = time.split(':').map(Number); 
    const [year, month, day] = date.split('-').map(Number);
    const combinedDate = new Date(year, month - 1, day, hours+1, minutes); 
    const student = await Student.findOne({
      where: {
        Email: studentEmail,
      },
    });
    const student2 = await Student.findOne({
      where: {
        Email: tutorEmail,
      },
    });
    const tutor = await Tutor.findOne({
      where: {
        StudentID: student2.StudentID,
      },
    });
    const newAppointment = await Appointment.create({
      State: "pending",
      Location: location,
      TutorID: tutor.TutorID,
      StudentID: student.StudentID,
      Date: combinedDate 
    });

    response.status(201).json({ appointment: newAppointment,msg: "Appointment created successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    response.status(500).json({ msg: "Error creating appointment", error: error.message });
  }
};


const updateAppointmentState = async (request, response) => {
  try {
    const { appointmentID,state } = request.params;

    const appointment = await Appointment.findByPk(appointmentID);

    if (!appointment) {
      return response.status(404).json({ msg: "Appointment not found" });
    }

    appointment.State = state;
    await appointment.save();
 
    response.status(200).json({ appointment, msg: "Appointment state updated successfully" });
  } catch (error) {
    console.error("Error updating appointment state:", error);
    response.status(500).json({ msg: "Error updating appointment state", error: error.message });
  }
};

const putAppointmentsAuto = async (request, response) => {
  try {
    const currentDate = new Date(); 

    const appointmentsToUpdate = await Appointment.findAll({
      where: {
        State: 'approved',
        Date: {
          [Sequelize.Op.lt]: currentDate 
        }
      }
    });

    const updatePromises = appointmentsToUpdate.map(async (appointment) => {
      appointment.State = 'done';
      return await appointment.save();
    });

    await Promise.all(updatePromises); 

    console.log('Appointments updated successfully');
    return response.status(200).json({ message: 'Appointments updated successfully' ,currentDate,appointmentsToUpdate });
  } catch (error) {
    console.error('Error updating appointments:', error);
    return response.status(500).json({ error: 'Error updating appointments' });
  }
};


  module.exports={getAppointmentsbyTutorId,getAppointmentsByStudentId2,postAppointment,updateAppointmentState,getExstudents,getAppointmentsbyStudentId,putAppointmentsAuto,getDoneAppointments};
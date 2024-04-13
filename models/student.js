import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

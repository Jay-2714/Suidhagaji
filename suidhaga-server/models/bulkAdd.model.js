import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  mobile: Number,
  aadharNumber: Number,
  rollNumber: Number,
  batchMonth: String,
  batchNo: Number
});

const EmployeeModel = mongoose.model('employeedata', employeeSchema);

export default EmployeeModel; 

import EmployeeModel from "../models/bulkAdd.model.js";
// import Employee from "../models/bulkAdd.model.js";

const employeeResolver = {
    Query:{
      getEmployee: async () => {
        try{
          const employee = await EmployeeModel.find();
          return employee;
        }catch(e){
          console.log(e);
          throw new Error(`Error fetching employee`);
        }
      }
  },
  Mutation:{
    addEmployee: async (_,{employee}) => {
      try{
        const newEmployee = await EmployeeModel.insertMany(employee);
        console.log(newEmployee);
        return newEmployee;
      }catch(e){
        console.log(e);
        throw new Error(`Error inserting employee`);
      }
    }
  }
}

export default employeeResolver;
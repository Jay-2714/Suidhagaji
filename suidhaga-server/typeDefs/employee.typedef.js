const EmployeeTypeDef = `#graphql
    type Employee {
        _id: String!
        title: String
        firstName: String
        middleName: String
        lastName: String
        mobile: Float
        aadharNumber: Float
        rollNumber: Int
        batchMonth: String
        batchNo: Int
    }
    type Query {
        getEmployee: [Employee!]!
    }
    type Mutation {
        addEmployee(employee: [EmployeeInput!]!): [Employee!]!
    }
    input EmployeeInput {
        title: String
        firstName: String
        middleName: String
        lastName: String
        mobile: Float
        aadharNumber:Float
        rollNumber: Int
        batchMonth: String
        batchNo: Int
    }

`

export default EmployeeTypeDef;
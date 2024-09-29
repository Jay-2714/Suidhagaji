import { gql } from "@apollo/client";

export const BULK_ADD = gql`
    mutation addEmployee($employee: [EmployeeInput!]!) {
            addEmployee(employee: $employee) {
                title
                firstName
                middleName
                lastName
                mobile
                aadharNumber
                rollNumber
                batchMonth
                batchNo
            }
        }
`
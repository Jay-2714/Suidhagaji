import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput){
    createOrder(input: $input){
        jobID
        appliedUsername
        appliedUserId
        userRole
        customerId
        jobName
    }
  }
`

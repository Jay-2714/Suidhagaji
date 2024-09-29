import { gql } from '@apollo/client';

export const ORDER_BY_USER_ID = gql`
  query OrderByUserId($input: queryInput!) {
    orderByUserId(input: $input) {
      _id
      jobID
      createdAt
      appliedUsername
      appliedUserId
      operation
      userRole
      customerId
      jobName
      customerName
    }
  }
`;

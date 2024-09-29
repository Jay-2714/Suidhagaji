import { gql } from "@apollo/client";

export const BulkAdd = gql`
    mutation bulkAdd($input: [ContactInput!]!) {
    bulkAdd(input: $input) {
    # Define the fields you want to return after adding the data
    }
  }
`;

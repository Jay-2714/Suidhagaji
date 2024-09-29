import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: commentInput!) {
    createComment(input: $input) {
      id
      body
      username
    }
  }
`;

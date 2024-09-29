import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    getComments(postId: $postId) {
      id
      postId
      body
      username
      createdAt
    }
  }
`;

export const GET_POST_COMMENTS = gql`
    query GetPostComments($postId: ID!, $offset: Int, $limit: Int) {
        getPostComments(postId: $postId, offset: $offset, limit: $limit) {
            id
            body
            username
            createdAt
            postId
        }
    }
`;
import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      body
      username
      createdAt
      image
    }
  }
`;

export const GET_POSTS_ADMIN = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      username
      createdAt
      image
    }
  }
`;
export const GET_POSTS_BY_ID = gql`
  query GetPosts($id: ID!) {
    getPostsById(accountId: $id) {
      _id
      title
      description
      image
      }
    }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($postId: ID!) {
    getPostById(postId: $postId) {
      _id
      image
      title
      description
      image
      }
    }
`;

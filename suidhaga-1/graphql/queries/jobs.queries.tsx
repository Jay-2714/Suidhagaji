import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      _id
      title
      description
      status
      size
      image
      color
      amount
      quantity
      name
      user
    }
  }
`;

export const GET_JOB_BY_ID = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      _id
      title
      description
      status
      size
      image
      color
      amount
      quantity
      user
      applications{
        username
        userId
      }
    }
  }
`;

export const GET_JOBS_BY_ID = gql`
  query GetJobs($id: ID!) {
    jobByUserID(id: $id) {
      _id
      title
      description
      status
      image
      user
    }
  }
`;

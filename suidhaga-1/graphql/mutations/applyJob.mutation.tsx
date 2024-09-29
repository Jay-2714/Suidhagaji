import { gql } from "@apollo/client";
 export const APPLY_JOB = gql`
 mutation Mutation($jobId: ID!) {
  applyJob(jobId: $jobId) {
    username
    name
    title
  }
}
`;
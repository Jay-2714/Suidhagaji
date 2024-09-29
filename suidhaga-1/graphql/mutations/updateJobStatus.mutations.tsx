import { gql } from "@apollo/client";

export const UPDATE_JOB_STATUS = gql`
    mutation UpdateJobStatus($jobId: ID!, $status: String!) {
        updateJobStatus(jobId: $jobId, status: $status) {
            _id
            status
        }
    }
`;

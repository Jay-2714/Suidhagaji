import { gql } from "@apollo/client";

export const DELETE_JOB = gql`
	mutation DeleteJob($jobId: ID!) {
		deleteJob(jobId: $jobId) {
            success
            message
        }
	}
`;
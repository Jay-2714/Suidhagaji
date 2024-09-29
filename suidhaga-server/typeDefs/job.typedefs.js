const JobTypeDef = `#graphql
    type Job {
        _id: ID!
        title: String!
        description: String!
        createdAt: String!
        applications: [Application]
        status: String
        color: String
        size: String
        quantity: Int
        amount: Int
        image: String
        name:String
        username: String 
        user:ID
    }

    type Application {
        userId: ID!
        createdAt: String!
        username: String
    }

    type Query{
        jobs: [Job]
        job(id: ID!): Job
        jobByUserID(id:ID!): [Job]
    }

    type DeleteJobResponse {
        success: Boolean
        message: String
    }
    
    type Mutation {
        createJob(input: jobInput!) : Job
        deleteJob(jobId: ID!): DeleteJobResponse
        updateJobStatus(jobId: ID!, status: String!): Job
        applyJob(jobId: ID!): Job
    }


    input jobInput {
        title: String!
        description: String!
        createdAt: String!
        color: String
        size: String
        quantity: Int
        amount: Int
        image: String
    }
`;
export default JobTypeDef;

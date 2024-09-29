const userTypeDef = `#graphql
  type User {
    _id: ID!
    userType: String!
    username: String!
    email: String!
    password: String!
    phone: String!
    name: String!
    applications: [Application]
    # profilePicture: String
    # gender: String!
    # transactions: [Transaction!]
  }
  type Application {
  id: ID!
  createdAt: String
  username: String
  }


  type Query {
    users: [User]
    authUser: User
    user(userId:ID!): User
    getAppliedJob: [User]
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
    updateUserRole(userId:ID!,userType:String): User
    applyJob(jobId: ID!): Job
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
    phone: String!
    name: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }
  
  type LogoutResponse {
    message: String!
  }
`;

export default userTypeDef;

const OrderTypeDef = `#graphql
    type Order{
        _id: ID
        jobID: ID
        createdAt: String
        appliedUsername: String
        appliedUserId: ID
        operation: String
        userRole: String   
        customerId: ID
        jobName: String
        customerName: String
    }

    type Application {
        userId: ID
        createdAt: String
        username: String
    }

    type Query {
        getOrders: [Order]!
        OrdersByJobId(id:ID!): [Order]!
        OrderById(id:ID!): Order!
        orderByUserId(input: queryInput): [Order]
    }   

    type Mutation {
        createOrder(input: OrderInput): Order
    }

    input queryInput {
        appliedUserId: ID!
        operation: String!
        userRole: String!
    }

    input OrderInput {
        jobID: ID!
        appliedUsername: String!
        appliedUserId: ID!
        userRole: String!
        customerId: ID!
        jobName: String!
        customerName: String!
    }
`;

export default OrderTypeDef;
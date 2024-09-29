import OrderModel from "../models/order.model.js";

const OrderResolver = {
  Mutation: {
    createOrder: async (_, { input }, context) => {
      const user = context.getUser();
      console.log("create order : ", user._id);
      const {
        jobID,
        appliedUsername,
        appliedUserId,
        userRole,
        customerId,
        jobName,
        customerName
      } = input;
      console.log(
        "Jobid: " +
          jobID +
          " User: " +
          appliedUsername +
          " Role: " +
          userRole +
          "userId: " +
          appliedUserId +
          " customerId: " +
          customerId
      );
      try {
        const newOrder = new OrderModel({
          jobID,
          createdAt: Date.now().toString(),
          appliedUsername,
          userRole,
          appliedUserId,
          operation: "Applied Order",
          customerId,
          jobName,
          customerName
        });
        await newOrder.save().then(() => {
          console.log(`Order Created ${jobID}`);
        });
        return newOrder;
      } catch (error) {
        console.log("Create Order Mutation Error : ", error);
        throw new Error("Error creating order");
      }
    },
  },
  Query: {
    orderByUserId: async (_, { input }) => {
      const { operation, appliedUserId, userRole } = input;
      console.log("Received input:", input);
      try {
        const orders = await OrderModel.find({
          appliedUserId: appliedUserId,
          userRole: userRole,
          operation: operation,
        });
        console.log("helo" +orders);
        return orders;
      } catch (error) {
        console.log(error);
        throw new Error("Error Fetching the Ordders by user ID");
      }
    },
  },
};

export default OrderResolver;

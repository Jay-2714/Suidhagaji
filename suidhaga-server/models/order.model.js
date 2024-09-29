import mongoose, { Schema } from "mongoose";
const OrderSchema = mongoose.Schema({
    jobID: {
        type: String,
        required: true,
    },
    createdAt: { type: String, required: true },
    appliedUsername: { type: String, required: true },
    // createdBy : {type:String, required:true},
    appliedUserId: { type: String, required: true },
    operation: { type: String, required: true },
    customerId: { type: String, required: true },
    userRole: { type: String, required: true },
    jobName: { type: String, required: true },
    customerName: {type: String, required: true}
});

const OrderModel = mongoose.model("order", OrderSchema);
export default OrderModel;

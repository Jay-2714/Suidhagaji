import mongoose,{Schema} from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String,
    },
    description:{
        required: true,
        type: String,
    },
    color:{
      type: String,
    },
    size:{
      type: String,
    },
    quantity:{
        type: Number,
    },
    amount:{
      type: Number,
      required: true
    },
    image:{
      type: String,
      required: true,
    },
    createdAt:{
        type: String,
        required: true,
    },
    applications: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          username: String,
          createdAt: String
        }
      ],
      status: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name:{
        type: Schema.Types.String,
        ref: 'users',
        required: true,
      }
},{timestamps: true})

const Job = mongoose.model('job',jobSchema);
export default Job;


import { request } from "express";
import mongoose,{Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String,
    },
    description:{
        required: true,
        type: String,
    },
    image : {
      type : String,
      required: true,
    },
    createdAt:{
        type: String,
        required: true,
    }, 
    username: {
      type: String,
      required: true,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
      likes: [
        {
          username: String,
          createdAt: String
        }
      ],
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      username:{
        type: Schema.Types.String,
        ref: 'users'
      }
},{timestamps: true})

const Post = mongoose.model('post',postSchema);
export default Post;
import Post from "../models/post.model.js";

const postResolver = {
    Mutation: {
        createPost:async (_,{input},context) =>{
            const user = await context.getUser();
            console.log(user);
            const {title , description , createdAt , image } = input;
            try {
                if (!title || !description || !createdAt || !image) {
                    throw new Error(`All fields are required`);
                }
                if(user){
                    const newPost= new Post({
                        title,
                        description,
                        createdAt,
                        image,
                        comments:[],
                        user: user.id,
                        username: user.username,
                    });
                    // console.log(newPost);
                    await newPost.save();
                    return newPost; 
                }
                if (!user) {
                    throw new Error(`User Not Found`)
                }
            } catch (error) {
                console.log(error)
                throw new Error(err.message || "Internal server error");
            }
        },
        deletePost:async (_,{postId},context) => {
            const user = context.getUser();
            // console.log(user.username);
            try {
                const post = await Post.findById(postId)
                console.log(post);
                // console.log(post.username);
                await post.deleteOne();
                if (post) {
                  return {
                    success: true,
                    message: "Post deleted successfully",
                  };
                } else {
                  return {
                    success: false,
                    message: "Post not found",
                  };
                }
                // if (post.username === user.username) {
                //     await post.delete();
                //     return `post deleted successfully`
                // }else{
                //     throw new Error(`Action not allowed`)
                // }
            } catch (error) {
                console.log("no"+ error.message);
                throw new Error(error);
            }
        }
    },
    Query: {
        posts:async () =>{
            try{
              const posts = await Post.find();
              return posts;
            }catch(error){
              console.log(error);
              throw new Error("Internal server error");
            }
          },
          getPostsById: async (_, { accountId } ) => {
            try{
              const post = await Post.find({ user: accountId });
              return post;
            }catch(error){
              console.log(error);
              throw new Error("Internal server error");
            }
      
        },
        getPostById: async (_, { postId } ) => {
          
            try{
              if(postId){
              const post = await Post.findById(postId);
              return post;
              } else {
                throw new Error("Post ID is required");
                console.log("post id not found");
              }
            }catch(error){
              console.log(error);
              throw new Error("Internal server error");
            }
    }
    }
}

export default postResolver;
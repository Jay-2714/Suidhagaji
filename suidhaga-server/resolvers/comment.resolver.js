import Post from "../models/post.model.js";
import CommentModel from "../models/comment.model.js";

const commentResolver = {
    Mutation: {
        createComment: async (_, { input }, context) => {
            const user = await context.getUser();
            console.log(user);
            const { postId, body } = input;
            console.log(input);
            if (body.trim() === '') {
                console.log(`Empty Body`);
                throw new Error(`Body should not be empty`)
            }

            const post = await Post.findById(postId);

            if (post) {
                const newComment = new CommentModel({
                    postId,
                    body,
                    username: user.name,
                    createdAt: new Date().toISOString(),
                });
                await newComment.save();

                //   await Post.findByIdAndUpdate(
                //     postId,
                //     { $push: { comments: newComment.toObject() } }, // Add the new comment's ID to the comments array
                //     { new: true } // Return the updated post document
                //   );
                post.comments.push(newComment);
                await post.save();

                return newComment;

            } else { throw new Error('Post not found'); }
        },
    },
    Query: {
        getComments: async (_, { postId }, context) => {
            try {
                const post = await Post.findById(postId).populate('comments');

                if (post) {
                    // const comments = await post.comments.find();
                    return post.comments;
                } else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                console.log(error);
                throw new Error("Internal server error");
            }
        },
        getPostComments: async (_, { postId, offset, limit }, context) => {
            try {
                const post = await Post.findById(postId).populate({
                    path: 'comments',
                    options: {
                        sort: { createdAt: -1 },
                        skip: offset,
                        limit: limit,
                    },
                });

                if (post) {
                    return post.comments;
                } else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                throw new Error('Error fetching comments');
            }
        },
    }
}

export default commentResolver;
// import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, email, password, phone , name } = input;

				if (!username || !email || !password || !phone || !name) {
					throw new Error("All fields are required");
				}
				const existingUser = await User.findOne({ phone });
				if (existingUser) {
					throw new Error("User already exists");
				}

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				// https://avatar-placeholder.iran.liara.run/
				// const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				// const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				const newUser = new User({
					username,
					userType:'employer',
					email,
					password: hashedPassword,
					phone,
					name,
					// profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (err) {
				console.error("Error in signUp: ", err);
				throw new Error(err.message || "Internal server error");
			}
		},

			login: async (_, { input }, context) => {
				try {
					const { username , password } = input;
					if (!username || !password) throw new Error("All fields are required");
					console.log(username , password);
					const { user } = await context.authenticate("graphql-local", { username , password });
					console.log(user);
					await context.login(user);
					return user;
				} catch (err) {
					console.error("Error in login:", err);
					throw new Error(err.message || "Internal server error");
				}
			},
		logout: async (_, __, context) => {
			try {
				await context.logout();
				context.req.session.destroy((err) => {
					if (err) throw err;
				});
				context.res.clearCookie("connect.sid");
				console.log(`user Logged Out`);
				return { message: "Logged out successfully" };
			} catch (err) {
				console.error("Error in logout:", err);
				throw new Error(err.message || "Internal server error");
			}
		},
		updateUserRole: async (_, { userId, userType }) => {
			try {
			  const user = await User.findById(userId);
			  if (!user) {
				throw new Error("User not found");
			  }
			  user.userType = userType;
			  await user.save();
			  return user;
			} catch (err) {
			  console.error("Error updating user role:", err);
			  throw new Error(err.message || "Internal server error");
			}
		},
	},
	Query: {
		authUser: async (_, __, context) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (err) {
				console.error("Error in authUser: ", err);
				throw new Error("Internal server error");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
		},
		users: async () => {
			try {
				const users = await User.find();
                return users;
			} catch (error) {
				console.log(error);
				throw new Error("Internal server error");
			}
		}
	},
	// User: {
	// 	transactions: async (parent) => {
	// 		try {
	// 			const transactions = await Transaction.find({ userId: parent._id });
	// 			return transactions;
	// 		} catch (err) {
	// 			console.log("Error in user.transactions resolver: ", err);
	// 			throw new Error(err.message || "Internal server error");
	// 		}
	// 	},
	// },
};

export default userResolver;

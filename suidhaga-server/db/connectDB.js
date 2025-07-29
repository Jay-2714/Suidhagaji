import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://jaysanjaymhatre2714:<db_password>@cluster0.5yfzkyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`ErrorDB: ${err.message}`);
		process.exit(1);
	}
};

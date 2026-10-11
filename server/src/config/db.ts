import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = "chatbot_wahidul_sami";

const connectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment variables");
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      authSource: "admin",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`MongoDB Connection Error: ${message}`);
    process.exit(1);
  }
};

export default connectDB;
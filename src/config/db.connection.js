import mongoose from "mongoose";
import { envVariables } from "./env.validate.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envVariables.MONGO_URI);
    // console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown handlers
export const closeDBConnection = async () => {
  try {
    await mongoose.disconnect();
    console.log("🛑 MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
  }
};

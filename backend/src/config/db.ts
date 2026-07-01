import mongoose from "mongoose";
import { log } from "node:console";

export const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("Database is connected successfully");
    
  }
  catch(error){
    console.log("Mongodb connection error", error);
    process.exit(1)
  }
}
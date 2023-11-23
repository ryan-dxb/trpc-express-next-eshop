import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  MONGO_PORT,
  DB_NAME as DB,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
} from "@/utils/variables";

dotenv.config();

const DB_NAME: string = DB as string;

const URI = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_PORT}/${DB_NAME}?authSource=admin`;
const connectDB = async () => {
  try {
    const connectionParams = {
      dbName: DB_NAME,
    };

    console.log("Connecting to the database...", URI);

    const dbConnection = await mongoose.connect(URI, connectionParams);

    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export default connectDB;

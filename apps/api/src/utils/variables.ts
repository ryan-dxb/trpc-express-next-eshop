import dotenv from "dotenv";
dotenv.config();

const { env } = process as { env: { [key: string]: string } };

export const {
  MONGO_PORT,
  DB_NAME,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD,
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
} = env;

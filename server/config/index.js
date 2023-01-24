import * as dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  MONGODB_URL,
  OPENAI_API_KEY,
} = process.env;

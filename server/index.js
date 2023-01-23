import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dallERoutes from "./routes/dallERoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dallERoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Nobita");
});

connectDB(process.env.MONGODB_URL)
  .then(() =>
    app.listen(8080, () => {
      console.log("Server is running on port http://localhost:8080");
    })
  )
  .catch((err) => console.log(err));

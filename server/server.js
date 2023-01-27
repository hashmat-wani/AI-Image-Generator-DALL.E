import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { APP_PORT } from "./config/index.js";
import { dallERoutes, authRoutes, postRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
import redis from "./config/redis.js";

const app = express();

const PORT = APP_PORT || 3000;

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dallERoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Nobita");
});

app.use(errorHandler);

connectDB(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));

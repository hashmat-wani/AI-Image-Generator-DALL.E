import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/post.route.js";
import dallERoutes from "./routes/dallE.route.js";
import googleOauthRoutes from "./routes/googleOauth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { APP_PORT } from "./config/index.js";

const app = express();
const PORT = APP_PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dallERoutes);
app.use("/api/v1/auth", googleOauthRoutes);

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

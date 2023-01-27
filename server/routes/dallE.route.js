import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/index.js";

const router = express.Router();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.send("Hello from DALL.E");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 4,
      size: "256x256",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data;
    res.status(200).json({ photos: image });
  } catch (err) {
    res.status(500).send(err?.response?.data?.error?.message);
  }
});

export default router;

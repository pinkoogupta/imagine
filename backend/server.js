const express = require("express");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("model", "sd3-medium");
    formData.append("output_format", "png");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    res.json({ image: imageDataUrl, prompt });
  } catch (error) {
    console.error("Stability AI Error:", error?.response?.status, error?.message);

    if (error?.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key. Check your .env file." });
    }
    if (error?.response?.status === 429) {
      return res.status(429).json({ error: "Rate limit hit. Please wait and try again." });
    }
    res.status(500).json({ error: "Failed to generate image. Please try again." });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "SD3 Image Generator API", status: "running" });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

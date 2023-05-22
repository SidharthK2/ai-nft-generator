import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;
    if (req.method !== "POST") {
      return res.status(400).json({ error: "Invalid request" });
    }

    const response = await openai.createImage({
      prompt,
      size: "256x256",
      n: 3,
    });

    return res.status(200).json({
      data: response.data,
    });
  } catch (err) {
    console.log(err);
  }
}

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert web developer. Return only complete HTML with embedded CSS. Do not return markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const html = completion.choices[0].message.content;

    return res.status(200).json({
      code: html
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to generate website"
    });

  }
}

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Create a complete HTML website with internal CSS only. Do not use markdown. Website idea: ${prompt}`
        }
      ]
    });

    return res.status(200).json({
      code: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      error: error.message
    });
  }
}

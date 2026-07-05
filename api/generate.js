import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer.

Return ONLY one complete HTML document.

Rules:
- Start with <!DOCTYPE html>
- Include <html>, <head>, <style>, <body>, and <script>.
- No markdown.
- No explanation.
- No triple backticks.
- Create a premium responsive website with:
  • Navbar
  • Hero
  • Features
  • About
  • Services
  • Pricing
  • Contact
  • Footer`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let html = completion.choices[0].message.content;

    html = html.replace(/```html/g, "");
    html = html.replace(/```/g, "");

    return res.status(200).json({
      code: html,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
  }

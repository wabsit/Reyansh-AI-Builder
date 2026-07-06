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
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are an expert frontend developer.

Return ONLY valid JSON.

Format:

{
  "html":"<!DOCTYPE html>...</html>"
}

Rules:
- Return JSON only.
- html must start with <!DOCTYPE html>
- No markdown.
- No explanation.
- Include CSS inside <style>.
- Include JavaScript inside <script>.
- Create a modern responsive website with Navbar, Hero, Features, About, Services, Pricing, Contact and Footer.`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = completion.choices[0].message.content.trim();

console.log("AI Response:");
console.log(response);

let html = ""; 
        try {
      const parsed = JSON.parse(response);
      html = parsed.html;
    } catch (e) {
      console.error("JSON Parse Error:", e);

      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: response
      });
    }

    if (!html) {
      return res.status(500).json({
        error: "No HTML generated"
      });
    }

    html = html
      .replace(/```html/gi, "")
      .replace(/```/g, "")
      .trim();

    return res.status(200).json({
      code: html
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      error: error.message
    });
  }
        }

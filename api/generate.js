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
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are a professional frontend developer.

IMPORTANT RULES:
1. Return ONLY valid HTML.
2. The FIRST line MUST be <!DOCTYPE html>
3. Do NOT use Markdown.
4. Do NOT use # headings.
5. Do NOT use bullet points.
6. Do NOT use triple backticks.
7. Include CSS inside <style>.
8. Include JavaScript inside <script>.
9. Create a beautiful responsive website.
10. End with </html>.`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    let html = completion.choices[0].message.content.trim();

    // अगर मॉडल Markdown भेज दे तो उसे हटा दें
    html = html.replace(/```html/gi, "").replace(/```/g, "").trim();

    // अगर HTML नहीं है, तो error दिखाएँ
    if (!html.startsWith("<!DOCTYPE html>")) {
      return res.status(500).json({
        error: "Model returned Markdown instead of HTML.",
        code: html
      });
    }

    return res.status(200).json({
      code: html
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
}    

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
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
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are an expert frontend developer.

Return ONLY complete HTML.

Rules:
- Start with <!DOCTYPE html>
- End with </html>
- Do NOT use Markdown.
- Do NOT use # headings.
- Do NOT use bullet lists.
- Include CSS inside <style>.
- Include JavaScript inside <script>.
- Create a beautiful responsive website with:
Navbar,
Hero,
Features,
About,
Services,
Pricing,
Contact,
Footer.
`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
        if (!html.toLowerCase().includes("<!doctype html")) {
      html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Generated Website</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:Arial,sans-serif;
  line-height:1.6;
  max-width:1200px;
  margin:40px auto;
  padding:20px;
}
</style>
</head>
<body>
${html}
</body>
</html>`;
    }

    return res.status(200).json({
      code: html
    });

  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      error: error.message || "Failed to generate website"
    });
  }
        }

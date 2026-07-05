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
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "Return ONLY a complete HTML document. Start with <!DOCTYPE html>. Do not use markdown. Do not use ```html. Include CSS inside <style> and JavaScript inside <script>."
        },
        {
          role: "user",
          content: `Create a professional responsive website for: ${prompt}`
        }
      ]
    });

    let html = completion.choices[0].message.content || "";

    html = html
      .replace(/```html/gi, "")
      .replace(/```/g, "")
      .trim();

    if (!html.startsWith("<!DOCTYPE html>")) {
      html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Generated Website</title>
<style>
body{font-family:Arial;padding:40px;}
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
      error: error.message
    });
  }
}    

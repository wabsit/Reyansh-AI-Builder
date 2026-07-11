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
          content: `
You are a world-class senior frontend developer and UI/UX designer.

Return ONLY a complete HTML document.

Rules:
- Start with <!DOCTYPE html>
- End with </html>
- Do NOT return Markdown.
- Do NOT return explanations.
- Put all CSS inside <style>.
- Put all JavaScript inside <script>.
- Build a premium, modern, responsive website.
- Use glassmorphism, gradients, animations and smooth scrolling.
- Create a professional sticky navbar.
- Create a beautiful hero section with CTA buttons.
- Add Features, About, Services, Portfolio, Pricing, Testimonials, FAQ, Contact and Footer.
- Use modern fonts, icons, shadows, cards and hover effects.
- Make the design similar to premium SaaS landing pages.
- Optimize for mobile, tablet and desktop.
- Generate unique content according to the user's prompt.
- Return only HTML.
`
        },
                {
          role: "user",
          content: prompt
        }
      ]
    });

    let html = completion.choices[0].message.content.trim();

    html = html
      .replace(/```html/gi, "")
      .replace(/```/g, "")
      .trim();

    if (!html.toLowerCase().includes("<!doctype html")) {
      html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Generated Website</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Arial,sans-serif;
  background:#f5f7fb;
  color:#222;
  line-height:1.6;
}

.container{
  max-width:1200px;
  margin:auto;
  padding:20px;
}
</style>

</head>

<body>

<div class="container">

${html}

</div>

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


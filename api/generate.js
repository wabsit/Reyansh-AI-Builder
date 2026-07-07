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
You are a world-class senior frontend developer.

Return ONLY complete HTML.

Rules:
- Return a complete HTML document starting with <!DOCTYPE html> and ending with </html>.
- Do NOT return Markdown.
- Do NOT return explanations.
- Put all CSS inside <style>.
- Put all JavaScript inside <script>.
- Make the website fully responsive.
- Use modern gradients, glassmorphism and smooth animations.
- Create a premium sticky navbar.
- Create a beautiful hero section with CTA buttons.
- Add Features, About, Services, Pricing, Testimonials, FAQ, Contact and Footer.
- Use attractive icons, cards, shadows and hover effects.
- Use modern fonts and premium color combinations.
- Make the design similar to premium SaaS landing pages.
- Generate unique content according to the user's prompt.
`

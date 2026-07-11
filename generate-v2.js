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

          content: `You are an expert frontend developer.

Return ONLY valid JSON.

Format:

{
"index.html":"",
"style.css":"",
"script.js":""
}

Do NOT return markdown.

Create a premium responsive website.

Generate complete HTML, CSS and JavaScript.`

        },

        {

          role: "user",

          content: prompt

        }

      ]

    });

    const response = completion.choices[0].message.content.trim();
        let result;

    try {

      result = JSON.parse(response);

    } catch (e) {

      console.error("JSON Parse Error:", e);

      return res.status(500).json({

        error: "AI returned invalid JSON",

        raw: response

      });

    }

    return res.status(200).json({

      "index.html": result["index.html"] || "",

      "style.css": result["style.css"] || "",

      "script.js": result["script.js"] || ""

    });

  } catch (error) {

    console.error("Groq Error:", error);

    return res.status(500).json({

      error: error.message || "Failed to generate website"

    });

  }

      }

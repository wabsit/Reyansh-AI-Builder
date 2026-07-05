export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt is required"
    });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<title>${prompt}</title>
<style>
body{
  font-family:Arial,sans-serif;
  background:#f4f4f4;
  padding:40px;
  text-align:center;
}
h1{
  color:#2563eb;
}
p{
  font-size:18px;
}
</style>
</head>
<body>

<h1>${prompt}</h1>

<p>🚀 Welcome to Reyansh AI Builder</p>

<p>This page was generated from your prompt.</p>

</body>
</html>
`;

  return res.status(200).json({
    code: html
  });
}

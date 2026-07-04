export default async function handler(req, res) {
  const { prompt } = req.body;

  // demo response (later AI API जोड़ेंगे)
  const result = `
Website Idea:
${prompt}

<!DOCTYPE html>
<html>
<head><title>Generated Site</title></head>
<body>
<h1>${prompt}</h1>
</body>
</html>
`;

  res.status(200).json({ result });
}

async function generate() {
  const prompt = document.getElementById("prompt").value;

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.result;
}

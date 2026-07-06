async function generate() {

    const prompt = document.getElementById("prompt").value;

    if (!prompt.trim()) {
        alert("Please enter your website idea.");
        return;
    }

    try {

        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        console.log(data);

        if (data.error) {
            document.getElementById("preview").srcdoc =
                "<h2 style='color:red;text-align:center'>" + data.error + "</h2>";
            return;
        }

        document.getElementById("preview").srcdoc = data.code;

    } catch (error) {

        console.error(error);

        document.getElementById("preview").srcdoc =
            "<h2 style='color:red;text-align:center'>Error loading AI response</h2>";

    }
}

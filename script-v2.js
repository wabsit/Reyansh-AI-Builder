// =====================================
// Reyansh AI Builder V2
// script-v2.js Part A
// =====================================

const prompt = document.getElementById("prompt");
const editor = document.getElementById("codeEditor");
const preview = document.getElementById("preview");
const aiStatus = document.getElementById("aiStatus");
const loadingScreen = document.getElementById("loadingScreen");

let currentFile = "index.html";

const files = {
    "index.html": "",
    "style.css": "",
    "script.js": ""
};

function showLoading() {
    if (loadingScreen) {
        loadingScreen.style.display = "flex";
    }
}

function hideLoading() {
    if (loadingScreen) {
        loadingScreen.style.display = "none";
    }
}

function setStatus(text) {
    if (aiStatus) {
        aiStatus.innerText = text;
    }
}

function updatePreview() {
    if (preview && editor) {
        preview.srcdoc = editor.value;
    }
}

if (editor) {
    editor.addEventListener("input", updatePreview);
  }
// =====================================
// Reyansh AI Builder V2
// script-v2.js Part B
// =====================================

async function generate() {

    if (!prompt.value.trim()) {
        alert("Please enter your website idea.");
        return;
    }

    showLoading();
    setStatus("Generating...");

    try {

        const response = await fetch("/api/generate-v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt.value
            })
        });

        const data = await response.json();

        if (!response.ok) {

            hideLoading();
            setStatus("Error");

            alert(data.error || "Generation Failed");

            return;
        }

        files["index.html"] = data["index.html"] || "";
        files["style.css"] = data["style.css"] || "";
        files["script.js"] = data["script.js"] || "";

        currentFile = "index.html";

        editor.value = files["index.html"];

        updatePreview();

        hideLoading();

        setStatus("Completed");

    } catch (error) {

        console.error(error);

        hideLoading();

        setStatus("Error");

        alert(error.message);

    }

}
// =====================================
// Reyansh AI Builder V2
// script-v2.js Part C
// =====================================

// HTML Tab
const htmlTab = document.getElementById("htmlTab");
if (htmlTab) {
    htmlTab.onclick = () => {
        currentFile = "index.html";
        editor.value = files["index.html"];
        updatePreview();
    };
}

// CSS Tab
const cssTab = document.getElementById("cssTab");
if (cssTab) {
    cssTab.onclick = () => {
        currentFile = "style.css";
        editor.value = files["style.css"];
    };
}

// JavaScript Tab
const jsTab = document.getElementById("jsTab");
if (jsTab) {
    jsTab.onclick = () => {
        currentFile = "script.js";
        editor.value = files["script.js"];
    };
}

// Copy Button
const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(editor.value);
        alert("Code copied successfully.");
    };
}

// Download Button
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
    downloadBtn.onclick = () => {

        const blob = new Blob([editor.value], {
            type: "text/plain"
        });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = currentFile;

        link.click();
    };
}

// Refresh Preview
const refreshPreview = document.getElementById("refreshPreview");
if (refreshPreview) {
    refreshPreview.onclick = () => {
        updatePreview();
    };
}

console.log("Reyansh AI Builder V2 Ready 🚀");

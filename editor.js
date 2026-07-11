// =====================================
// Reyansh AI Builder Pro
// Editor Part A
// =====================================

const editor = document.getElementById("codeEditor");
const preview = document.getElementById("preview");

function loadHTML() {

    editor.value =
`<!DOCTYPE html>
<html>
<head>
<title>Reyansh AI Builder</title>
</head>

<body>

<h1>Hello World</h1>

</body>
</html>`;

    preview.srcdoc = editor.value;

}

function updatePreview(){

    preview.srcdoc = editor.value;

}

if(editor){

editor.addEventListener("keyup", updatePreview);

loadHTML();

}
// =====================================
// Reyansh AI Builder Pro
// Editor Part B
// =====================================

const files = {

"index.html":"",

"style.css":"",

"script.js":""

};

let currentFile = "index.html";

function openFile(fileName){

currentFile = fileName;

editor.value = files[fileName];

updatePreview();

}

function saveCurrentFile(){

files[currentFile] = editor.value;

}

if(editor){

editor.addEventListener("input", function(){

saveCurrentFile();

});

                        }
// =====================================
// Reyansh AI Builder Pro
// Editor Part C
// =====================================

// File Explorer Buttons
const htmlBtn = document.getElementById("htmlFile");
const cssBtn = document.getElementById("cssFile");
const jsBtn = document.getElementById("jsFile");

if (htmlBtn) {
    htmlBtn.addEventListener("click", () => {
        saveCurrentFile();
        openFile("index.html");
    });
}

if (cssBtn) {
    cssBtn.addEventListener("click", () => {
        saveCurrentFile();
        openFile("style.css");
    });
}

if (jsBtn) {
    jsBtn.addEventListener("click", () => {
        saveCurrentFile();
        openFile("script.js");
    });
}

// Download Current File
function downloadCurrentFile() {

    saveCurrentFile();

    const blob = new Blob([editor.value], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = currentFile;

    link.click();

}

const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCurrentFile);
}

console.log("Reyansh AI Builder Editor Ready");

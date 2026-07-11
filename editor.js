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

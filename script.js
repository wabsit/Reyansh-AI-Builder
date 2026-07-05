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
async function generate() {

    const prompt = document.getElementById("prompt").value;

    if(prompt.trim() === ""){
        alert("Please enter your website idea.");
        return;
    }

    try{

        const response = await fetch("/api/generate",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                prompt:prompt
            })
        });

        const data = await response.json();

        document.getElementById("preview").srcdoc = data.code;

    }catch(error){

        document.getElementById("preview").srcdoc = `
        <h2 style="text-align:center;color:red;">
        Error loading AI response
        </h2>
        `;

        console.error(error);
    }

}

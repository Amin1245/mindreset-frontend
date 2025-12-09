const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const feeling = localStorage.getItem("feeling");
const duration = localStorage.getItem("duration");

document.getElementById("summary").innerHTML =
    `Thank you ${name}, your feeling "${feeling}" has been recorded.`;

// SEND TO AWS
fetch("https://0shggvc8ne.execute-api.eu-central-1.amazonaws.com/prod/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name,
        email,
        feeling,
        duration
    })
})
.then(res => res.json())
.then(data => console.log("Sent:", data))
.catch(err => console.error(err));

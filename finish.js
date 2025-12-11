const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const feeling = localStorage.getItem("feeling");
const duration = Number(localStorage.getItem("duration")) || 0;


if (!name || !email || !feeling) {
    window.location.href = "user.html";
}

document.getElementById("summary").innerHTML =
    `Thank you ${name}, your feeling "${feeling}" has been recorded.`;

if (!localStorage.getItem("sent")) {
    
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
    .then(data => {
        console.log("Sent:", data);
        localStorage.setItem("sent", "yes");
    })
    .catch(err => console.error(err));
}

document.querySelector("button").addEventListener("click", () => {
    localStorage.clear();
});

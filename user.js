function saveUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Please enter both name and email");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    window.location.href = "index.html";
}

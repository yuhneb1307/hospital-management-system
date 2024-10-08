let loginForm = document.getElementById("loginForm");
let role = document.getElementById("role");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("loginButton");
let notification = document.getElementById("notification");

role.addEventListener("click", (e) => {
  notification.classList.add("d-none");
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Hide notification by default
  notification.classList.add("d-none");

  if (email !== null && email.value === "" || password !== null && password.value === "") {
    notification.classList.remove("d-none");
    notification.innerText ="Please enter your email/password";
    console.error("Error: ", "Please enter your email/password");
  } else {
  const formData = {
    email: email.value,
    password: password.value,
  };
  const apiUrl = "http://localhost:3000/" + role.value + "/login";
  console.log(apiUrl);

  // Make a POST request using the Fetch API
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }
      console.log(response);
      return response.json();
    })
    .then((userData) => {
      if (userData.length == 1) {
        localStorage.setItem(role.value + "Data", JSON.stringify(userData));
        window.location.assign(
          "http://localhost:3000/" + role.value + "/" + userData[0].id
        );
      } else if (userData.length == 0) {
        throw new Error("Invalid email or password.");
      }
    })
    .catch((error) => {
      // Show the error notification
      notification.classList.remove("d-none");
      notification.innerText = error.message;
      console.error("Error:", error);
    });
  }
});

fetch("http://localhost:3000/patients/update-data", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
}).then((response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
});
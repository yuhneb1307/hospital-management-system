let loginForm = document.getElementById("loginForm");
let role = document.getElementById("role");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("loginButton");

// role.addEventListener("click", (e) => {
//   //   loginForm.action = "/" + role.value + "/login";
//   //   console.log(loginButton.value);
// });

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  //   fetchData();
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
        throw new Error("Network response was not ok");
      }
      console.log(response);
      return response.json();
    })
    .then((userData) => {
      console.log(userData);
      // Process the newly created user data
      if (userData.length == 1) {
        localStorage.setItem(role.value + "Data", JSON.stringify(userData));
        window.location.assign(
          "http://localhost:3000/" + role.value + "/" + userData[0].id
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

fetch("http://localhost:3000/patients/update-data", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
});

let registerButton = document.getElementById("registerButton");
var new_id = 0;

fetch("http://localhost:3000/patients/count/user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].patient_no);
    new_id = data[0].patient_no + 1;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

registerButton.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = {
    id: new_id,
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    date_of_birth: document.getElementById("date_of_birth").value,
    gender: document.getElementById("gender").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    doctor_id: null,
  };

  const apiUrl = "http://localhost:3000/patients/";

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
      return response.json();
    })
    .then((userData) => {
      // Process the newly created user data
      if (userData.length == 1) {
        localStorage.setItem(role.value + "Data", JSON.stringify(userData));
        window.location.assign(
          "http://localhost:3000/" + role.value + "/" + userData[0].id
        );
      }
      console.log(userData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

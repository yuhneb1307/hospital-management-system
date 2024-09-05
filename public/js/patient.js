let userData = JSON.parse(localStorage.getItem("userData"))[0];
console.log(userData);

nameDiv = document.getElementById("name");
idDiv = document.getElementById("id");
dobDiv = document.getElementById("dob");
phoneDiv = document.getElementById("phone");
addressDiv = document.getElementById("address");
allergyDiv = document.getElementById("allergy");

// address: "22260 Columbus Pass";
// date_of_birth: "2013-02-20T08:39:49.000Z";
// email: "tcauser0@yale.edu";
// first_name: "Toiboid";
// gender: "Male";
// id: 1;
// last_name: "Causer";
// password: "sI6WaQ3/Bp$";
// phone: "132 301 2084";
// username: "tcauser0";

nameDiv.innerHTML = "Name: " + userData.first_name + " " + userData.last_name;
idDiv.innerHTML = "ID: " + userData.id;
dobDiv.innerHTML = "DOB: " + userData.date_of_birth;
phoneDiv.innerHTML = "Phone Number: " + userData.phone;
addressDiv.innerHTML = "Address: " + userData.address;
// Div.innerHTML = "" + userData.;


const apiUrl = "http://localhost:3000/patient/login";

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
    // console.log("New User Data:", uerData);
    if (userData.length == 1) {
      localStorage.setItem("userData", userData);
      window.location.assign("http://localhost:3000/patients-infor");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

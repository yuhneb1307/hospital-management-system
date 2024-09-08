if (localStorage.length == 0) {
  alert("You are not logged in.");
  window.location.href = "http://localhost:3000/";
}

const urlID = window.location.href.replace(
  "http://localhost:3000/patients/",
  ""
).replace(
  "#",
  ""
);

if (localStorage.getItem("patientsData") == null) {
  if (localStorage.getItem("staffsData") == null) {
    alert("You are not logged in.");
    window.location.href = "http://localhost:3000/";
  }
} else {
  let patientsData = JSON.parse(localStorage.getItem("patientsData"))[0];
  if (patientsData.id != urlID) {
    alert("You are not authorized to view this patient's information.");
    window.location.href = "http://localhost:3000/patients/" + patientsData.id;
  }
}

let patientsData = JSON.parse(localStorage.getItem("patientsData"))[0];
const urlID = window.location.href.replace(
  "http://localhost:3000/patients/",
  ""
);
// console.log();
// console.log(patientsData);


if (patientsData == null) {
  if (staffsData == null) {
    alert("You are not log.");
    window.location.href = "http://localhost:3000/";
  }
} else if (patientsData.id != urlID) {
  alert("You are not authorized to view this patient's information.");
  window.location.href = "http://localhost:3000/patients/" + patientsData.id;
}

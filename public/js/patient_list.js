if (localStorage.getItem("staffsData") == null) {
  alert("You are not logged in.");
  window.location.href = "http://localhost:3000/";
}
const urlID = window.location.href.replace("http://localhost:3000/staffs/", "");

if (localStorage.getItem("staffsData") == null) {
  alert("You are not logged in.");
  window.location.href = "http://localhost:3000/";
} else {
  let staffsData = JSON.parse(localStorage.getItem("staffsData"))[0];
//   if (staffsData.id != urlID) {
//     alert("You are not authorized to view this patient's information.");
//     window.location.href = "http://localhost:3000/staffs/" + patientsData.id;
//   }
}

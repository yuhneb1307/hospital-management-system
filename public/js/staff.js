let userData = JSON.parse(localStorage.getItem("userData"))[0];
const urlID = window.location.href.replace(
  "http://localhost:3000/staffs/",
  ""
);
// console.log();
// console.log(userData);

if (userData.id != urlID || userData == null) {
  alert("You are not authorized to view this patient's information.");
  window.location.href = "http://localhost:3000/staffs/" + userData.id;
}
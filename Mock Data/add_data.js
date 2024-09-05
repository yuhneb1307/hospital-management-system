const mysql = require("mysql2");
const fs = require("fs");
const fastcsv = require("fast-csv");

// update below conection config to match your system
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Conchjma123@",
  database: "dataproject",
});

let departmentStream = fs.createReadStream("Department.csv");
let departmentCSVData = [];
let departmentData = fastcsv
  .parse()
  .on("data", function (data) {
    departmentCSVData.push(data);

    // console.log(departmentCSVData);
  })
  .on("end", function () {
    // remove the first line: header
    departmentCSVData.shift();

    // connect to the MySQL database
    con.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO departments (id,name) VALUES ?";
        con.query(query, [departmentCSVData], (error, response) => {
          console.log(error || response);
        });
      }
    });
    // save departmentCSVData
  });

departmentStream.pipe(departmentData);

let patientStream = fs.createReadStream("Patients.csv");
let patientCSVData = [];
let patientData = fastcsv
  .parse()
  .on("data", function (data) {
    patientCSVData.push(data);

    // console.log(patientCSVData);
  })
  .on("end", function () {
    // remove the first line: header
    patientCSVData.shift();

    // connect to the MySQL database
    con.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO patients (id,first_name,last_name,password,email,date_of_birth,gender,phone,address,doctor_id) VALUES ?";
        con.query(query, [patientCSVData], (error, response) => {
          console.log(error || response);
        });
      }
    });
    // save patientCSVData
  });

patientStream.pipe(patientData);

let doctorStream = fs.createReadStream("Doctor.csv");
let doctorCSVData = [];
let doctorData = fastcsv
  .parse()
  .on("data", function (data) {
    doctorCSVData.push(data);

    // console.log(doctorCSVData);
  })
  .on("end", function () {
    // remove the first line: header
    doctorCSVData.shift();

    // connect to the MySQL database
    con.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO staff (id,first_name,last_name,role,department_id,schedule,salary,managed_by,email,gender,password) VALUES ?";
        con.query(query, [doctorCSVData], (error, response) => {
          console.log(error || response);
        });
      }
    });
    // save doctorCSVData
  });

doctorStream.pipe(doctorData);

let nurseStream = fs.createReadStream("Nurse.csv");
let nurseCSVData = [];
let nurseData = fastcsv
  .parse()
  .on("data", function (data) {
    nurseCSVData.push(data);

    // console.log(nurseCSVData);
  })
  .on("end", function () {
    // remove the first line: header
    nurseCSVData.shift();

    // connect to the MySQL database
    con.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO staff (id,first_name,last_name,role,department_id,schedule,salary,managed_by,email,gender,password) VALUES ?";
        con.query(query, [nurseCSVData], (error, response) => {
          console.log(error || response);
        });
      }
    });
    // save nurseCSVData
  });

nurseStream.pipe(nurseData);

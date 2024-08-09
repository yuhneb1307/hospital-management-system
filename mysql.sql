CREATE DATABASE HospitalManagement;

USE HospitalManagement;

CREATE TABLE Patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender ENUM('Male', 'Female', 'Other'),
  contact_details TEXT,
  allergies TEXT,
  treatment_history TEXT
);

CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_type ENUM('Doctor', 'Nurse', 'Admin'),
  qualifications TEXT,
  department_id INT,
  schedule TEXT,
  salary DECIMAL(10, 2),
  FOREIGN KEY (department_id) REFERENCES Departments(id)
);

CREATE TABLE Appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  staff_id INT,
  appointment_date DATETIME,
  purpose TEXT,
  FOREIGN KEY (patient_id) REFERENCES Patients(id),
  FOREIGN KEY (staff_id) REFERENCES Staff(id)
);

CREATE TABLE Departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Relationships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT,
  manager_id INT,
  FOREIGN KEY (staff_id) REFERENCES Staff(id),
  FOREIGN KEY (manager_id) REFERENCES Staff(id)
);

USE dataProject;

DROP TABLE Patients;

CREATE TABLE Patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender ENUM('Male', 'Female', 'Other'),
  contact_details TEXT,
  allergies TEXT,
  treatment_history TEXT
)ENGINE = InnoDB;;

DROP TABLE Staff;

CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_type ENUM('doctor', 'nurse', 'admin'),
  qualifications TEXT,
  department_id INT,
  schedule TEXT,
  salary DECIMAL(10, 2),
  FOREIGN KEY (department_id) REFERENCES Departments(id)
)ENGINE = InnoDB;;

DROP TABLE Appointments;

CREATE TABLE Appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  staff_id INT,
  appointment_date DATETIME,
  purpose TEXT,
  FOREIGN KEY (patient_id) REFERENCES Patients(id),
  FOREIGN KEY (staff_id) REFERENCES Staff(id)
)ENGINE = InnoDB;;

DROP TABLE Departments;

CREATE TABLE Departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)ENGINE = InnoDB;;

DROP TABLE Relationships;

CREATE TABLE Relationships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT,
  manager_id INT,
  FOREIGN KEY (staff_id) REFERENCES Staff(id),
  FOREIGN KEY (manager_id) REFERENCES Staff(id)
)ENGINE = InnoDB;;
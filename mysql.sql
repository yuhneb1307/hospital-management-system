USE dataProject;

-- Drop tables in the correct order, starting with the most dependent tables
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Patients;
DROP TABLE IF EXISTS Departments;

-- Create Departments table first
CREATE TABLE Departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

-- Create Patients table
CREATE TABLE Patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_of_birth DATETIME NOT NULL,
  gender ENUM('Male', 'Female', 'Other'),
  phone VARCHAR(12),
  address TEXT,
  doctor_id int
) ENGINE = InnoDB;

-- Create Staff table
CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role ENUM('Doctor', 'Nurse', 'Admin'),
  department_id INT,
  schedule TEXT,
  salary DECIMAL(10, 2),
  managed_by CHAR(9),
  gender ENUM('Male', 'Female', 'Other'),
  FOREIGN KEY (department_id) REFERENCES Departments(id)
) ENGINE = InnoDB;

-- Select all data from each table
SELECT * FROM Departments;
SELECT * FROM Patients;
SELECT * FROM Staff;
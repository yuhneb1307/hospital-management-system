USE dataProject;

-- Drop tables in the correct order, starting with the most dependent tables
DROP TABLE IF EXISTS Relationships;
DROP TABLE IF EXISTS Appointments;
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
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender ENUM('Male', 'Female', 'Other'),
  contact_details TEXT,
  allergies TEXT,
  treatment_history TEXT
) ENGINE = InnoDB;

-- Create Staff table
CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_type ENUM('Doctor', 'Nurse', 'Admin'),
  qualifications TEXT,
  department_id INT,
  schedule TEXT,
  salary DECIMAL(10, 2),
  FOREIGN KEY (department_id) REFERENCES Departments(id)
) ENGINE = InnoDB;

-- Create Appointments table
CREATE TABLE Appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  staff_id INT,
  appointment_date DATETIME,
  purpose TEXT,
  FOREIGN KEY (patient_id) REFERENCES Patients(id),
  FOREIGN KEY (staff_id) REFERENCES Staff(id)
) ENGINE = InnoDB;

-- Create Relationships table
CREATE TABLE Relationships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT,
  manager_id INT,
  FOREIGN KEY (staff_id) REFERENCES Staff(id),
  FOREIGN KEY (manager_id) REFERENCES Staff(id)
) ENGINE = InnoDB;

-- Insert data into Departments table
INSERT INTO Departments (name) VALUES
('Cardiology'),
('Emergency Care'),
('Administration');

-- Insert data into Staff table
INSERT INTO Staff (name, job_type, qualifications, department_id, schedule, salary) VALUES
('Dr. Alice Johnson', 'Doctor', 'MD, Cardiology', 1, 'Mon-Fri 9am-5pm', 150000.00),
('Nurse Bob Brown', 'Nurse', 'RN, Emergency Care', 2, 'Wed-Sun 7am-3pm', 80000.00),
('Mary Green', 'Admin', 'Bachelor of Business Administration', 3, 'Mon-Fri 8am-4pm', 60000.00);

-- Insert data into Patients table
INSERT INTO Patients (name, age, gender, contact_details, allergies, treatment_history) VALUES
('John Doe', 45, 'Male', '1234 Elm St, Springfield, IL, (555) 123-4567', 'Peanuts, Penicillin', 'Hypertension treatment, Knee surgery'),
('Jane Smith', 30, 'Female', '5678 Oak St, Springfield, IL, (555) 234-5678', 'None', 'Physical therapy for back pain');

-- Insert data into Appointments table
INSERT INTO Appointments (patient_id, staff_id, appointment_date, purpose) VALUES
(1, 1, '2024-08-10 10:00:00', 'Cardiology consultation'),
(2, 2, '2024-08-11 14:00:00', 'Routine physical checkup');

-- Insert data into Relationships table
INSERT INTO Relationships (staff_id, manager_id) VALUES
(2, 1),  -- Nurse Bob Brown is managed by Dr. Alice Johnson
(3, 1);  -- Mary Green (Admin) is managed by Dr. Alice Johnson

-- Select all data from each table
SELECT * FROM Departments;
SELECT * FROM Patients;
SELECT * FROM Staff;
SELECT * FROM Appointments;
SELECT * FROM Relationships;
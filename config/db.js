const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hospital_management'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});
module.exports = connection;
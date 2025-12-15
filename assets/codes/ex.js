const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',       // or 127.0.0.1
  user: 'root',            // your MySQL username
  password: 'Logith*2525',            // your MySQL password
  database: 'vitgpt'       // your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  console.log('Connected to MySQL!');

  // Example SQL query
  const sql = 'SELECT * FROM users';  // change this to your table

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Query results:', results);

    // Close the connection after query
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
        return;
      }
      console.log('Connection closed.');
    });
  });
});

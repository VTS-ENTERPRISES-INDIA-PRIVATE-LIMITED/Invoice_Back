const connection = require('../db/connection');

const createTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS client (
        client_id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(100),
        email VARCHAR(100) unique,
        phone VARCHAR(10) NOT NULL,
        date_of_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT ,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE 
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating table:', err.stack);
        return;
      }
      console.log('client table  created or already exists');
    });
  };
  
  module.exports = createTable;
  
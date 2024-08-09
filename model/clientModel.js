const connection = require('../db/connection');

const createTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS client (
        client_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        company_name VARCHAR(100),
        email VARCHAR(100) unique,
        country VARCHAR(100),
        address VARCHAR(255),
        postal VARCHAR(100),
        city VARCHAR(100),
        phone VARCHAR(10) NOT NULL,
        image_url VARCHAR(255),
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
  
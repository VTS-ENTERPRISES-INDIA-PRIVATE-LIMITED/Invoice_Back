const connection = require('../db/connection');

const createTable = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) unique,
        password VARCHAR(255) NOT NULL,
        otp VARCHAR(255) default NULL ,
        date_of_invoice_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating table:', err.stack);
        return;
      }
      console.log('User table  created or already exists');
    });
  };
  
  module.exports = createTable;
  
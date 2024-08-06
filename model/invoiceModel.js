const connection = require('../db/connection');

const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(100) NOT NULL,
      invoice_link VARCHAR(255) NOT NULL,
      payable_amount VARCHAR(255) NOT NULL,
      products JSON NOT NULL,
      date_of_invoice_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }
    console.log('Table created or already exists');
  });
};

module.exports = createTable;

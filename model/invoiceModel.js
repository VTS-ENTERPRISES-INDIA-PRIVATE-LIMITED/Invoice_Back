const connection = require('../db/connection');

const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS invoice (
      invoice_id INT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(100) NOT NULL,
      invoice_link VARCHAR(255) NOT NULL,
      payable_amount VARCHAR(255) NOT NULL,
      products JSON NOT NULL,
      date_of_invoice_generation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      client_id INT,
      FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }
    console.log('Invoice table created or already exists');
  });
};

module.exports = createTable;

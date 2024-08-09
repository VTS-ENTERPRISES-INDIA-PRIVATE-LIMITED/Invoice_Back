const connection = require("../db/connection.js");

const dropTable = (tableName) => {
    if (tableName === 'invoice') {
        const dropForeignKeyQuery = `
            ALTER TABLE invoice DROP FOREIGN KEY invoice_ibfk_1;  // replace with the correct constraint name
        `;

        connection.query(dropForeignKeyQuery, (err, result) => {
            if (err) {
                console.error('Error dropping foreign key constraint:', err.stack);
                return;
            }
            console.log('Foreign key constraint dropped.');
        });
    }

    const query = `DROP TABLE IF EXISTS ${tableName};`;

    connection.query(query, (err, result) => {
        if (err) {
            console.error(`Error dropping table ${tableName}:`, err.stack);
            return;
        }
        console.log(`Table ${tableName} dropped successfully.`);
    });
};

module.exports = dropTable;

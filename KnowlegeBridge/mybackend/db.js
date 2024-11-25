const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "web2",
    password: "123",
    port: 5432,
    application_name: 'mybackend',
    options: '-c search_path=scheamaweb'
});


// Set the search_path after connecting
pool.query('SELECT current_schema()', (err, res) => {
    if (err) {
        console.error('Error retrieving current schema:', err);
    } else {
        console.log('Active schema:', res.rows[0].current_schema);
    }
});


module.exports = pool;

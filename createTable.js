const pool = require('./db')

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS recipes(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    ingredients TEXT NOT NULL,
    directions TEXT NOT NULL,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

pool.query(createUsersTable, (err) => {
  console.error(err);
  pool.end();
  console.log('Done creating tables');
});



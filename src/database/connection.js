
const {
  CONNECTION
} = require("../config");

console.log(CONNECTION)
const pgp = require('pg-promise')();

const db = pgp(CONNECTION);



module.exports = db;
// SQL query to create the schema

const createTableQuery1 = `
    CREATE TABLE IF NOT EXISTS pegawai_t (
    pegawai_id SERIAL PRIMARY KEY,
    nama_pegawai VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    position VARCHAR(255),
    foto VARCHAR(255)
    );

`;


async function createSchema() {
  try {
    await db.connect();
    await db.query(createTableQuery1);
    console.log('Schema created successfully.');
  } catch (error) {
    console.error('Error creating schema:', error);
  } 
}

createSchema();

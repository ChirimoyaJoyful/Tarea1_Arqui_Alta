const pg = require('pg')

const { Pool } = pg

const pool = new Pool({
    user: process.env.user,
    host: 'postgresql',
    database: process.env.db,
    password: process.env.pass,
    port: 5432,
});

(async () => {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT NOW()');
      console.log(res.rows[0]);
      client.release();
    } catch (err) {
      console.error('Error al conectar a la base de datos', err);
    }
  })();
  
module.exports = pool;
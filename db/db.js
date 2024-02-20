const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgresuser',
  password: 'RRfqGIzqi3ZIRdAKx8jDtxsr3koAnEd4',
  host: 'dpg-cn9kd3gl5elc73932670-a',
  database: 'ecommerce_rtti',
  port: 5432,
})

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  }
}
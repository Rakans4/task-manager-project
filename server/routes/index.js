var express = require('express');
var router = express.Router();
const pool = require('../config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Failed to connect to PostgreSQL:', err);
  } else {
    console.log('✅ Connected to PostgreSQL at:', res.rows[0].now);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

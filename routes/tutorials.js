var express = require('express');
var router = express.Router();
const connection = require('../db-connection/db-connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM tutorials', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/:id', function(req, res, next) {
  connection.query('SELECT * FROM tutorials WHERE tutorialid = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.delete('/:id', function(req, res, next) {
  connection.query('DELETE FROM tutorials WHERE tutorialid = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.delete('/', function(req, res, next) {
  // deletes all tutorials from the table
  connection.query('DELETE FROM tutorials', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/', function(req, res, next) {
  connection.query('INSERT INTO tutorials (tutorialTitle, description, published) VALUES (?, ?, ?)', [req.body.tutorialTitle, req.body.description, req.body.published], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

//a request to allow a search for tutorials by title or description
router.get('/search/:searchTerm', function(req, res, next) {
  connection.query('SELECT * FROM tutorials WHERE tutorialTitle LIKE ? OR description LIKE ?', ['%' + req.params.searchTerm + '%', '%' + req.params.searchTerm + '%'], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.put('/:id', function(req, res, next) {
  connection.query('UPDATE tutorials SET tutorialTitle = ?, description = ?, published = ? WHERE tutorialid = ?', [req.body.tutorialTitle, req.body.description, req.body.published, req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});


module.exports = router;

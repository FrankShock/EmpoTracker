const express = require('express');
const router = express.Router();
const db = require('../db/Connection');
const inputCheck = require('../Utl/InputCheck')

//all  departments
router.get(`SELECT * FROM ALL departments`, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });

  //single department
  router.get(`SELECT * FROM departments WHERE id = 1`, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.log(row);
  });

  //create an department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'name'
    );
  
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [
      body.name
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  });

  //update department
  router.put('/department/:role_id', (req, res) => {
    const errors = inputCheck(req.body, 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE department SET department = ? WHERE name = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
  
      } else if (!result.affectedRows) {
        res.json({
          message: 'Department not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  
  //delete department
  router.delete()
  module.export = router;
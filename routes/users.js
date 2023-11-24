const { PrismaClient } = require("@prisma/client")
var express = require('express');
var router = express.Router();
const db = require("../config/connection")

const prisma = new PrismaClient()
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API READY !');
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee"

  db.query(sql, (err, result) => {
    if(err){
      res.status(500).send({
        status: false,
        data: [],
      })
    } else {
      res.status(200).send({
        status: true,
        message: "GET SUCCESS",
        data: result,
      })
    }
  })
})

router.post("/employee", (req, res) => {
  const { nama, job, salary } = req.body
  const sql = `INSERT INTO employee (nama, job, salary) VALUES ('${nama}', '${job}', ${salary})`

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({
        status: false,
        data: []
      })
    } else {
      res.status(201).send({
        status: true,
        message: "Data Created",
        data: {
          id: result.insertId,
          fields: req.body,
        }
      })
    }
  })
})

router.put("/employee/:id", (req, res) => {
  const { nama, job, salary } = req.body
  const id = req.params.id
  const sql = `UPDATE employee SET nama = '${nama}', job = '${job}', salary = ${salary} WHERE id_employee = ${id}`

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({
        status: false,
        data: [],
      })
    } else {
      res.send({
        status: true,
        message: "Update Success",
        data: req.body,
      })
    }
  })
})

router.delete("/employee", (req, res) => {
  const { nama } = req.body
  const sql = `DELETE FROM employee WHERE nama = '${nama}'`

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({
        status: false,
        data: [],
      })
    } else {
      res.send({
        status: true,
        message: "Delete Success",
        data: result,
      })
    }
  })
})
module.exports = router;

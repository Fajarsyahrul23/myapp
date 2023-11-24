const { PrismaClient } = require("@prisma/client")
var express = require('express');
var router = express.Router();

const prisma = new PrismaClient()

router.get("/employee/:id", async (req, res) => {
    const { id } = req.params
  
    try {
      const employee = await prisma.employee.findUnique({
        where: { id_employee: parseInt(id)},
      })
  
      if (employee) {
        res.json(employee)
      } else {
        res.status(404).json({ error: "Data Employee Tidak Ditemukan."
      })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Gagal Mengambil Data"})
    }
  })

  router.post("/employee",async (req, res) => {
    try{
        const{nama,job,salary} =req.body
        const employee = await prisma.employee.create({
            data:{
                nama,
                job,
                salary,
            },
            })
        res.send({
            staus : true,
            message: "Data Created",
            data : employee,
        })
    } catch (err){
        res.send({
            status: false,
            err: "Gagal Membuat data employee baru",
        })
    }
})
  module.exports = router;
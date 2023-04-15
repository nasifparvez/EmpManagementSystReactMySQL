const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

let sql = `CALL filterTodo(?)`;
 
 
//Establish the database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "empmanagementsyst",
});


db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
});
 
//Establish the Port
server.listen(3001,function check(error) {
    if (error)
    {
        console.log("Error");
    }
 
    else
    {
        console.log("Started on 3001");
    }
});
 
//Create the Records
server.post("/api/employee/add", (req, res) => {
    let details = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      salary: req.body.salary,
      title: req.body.title,
      mngr_id: req.body.mngr_id,
      empid:req.body.emp_id
    };
      let sql = "INSERT INTO employee SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Employee created Failed" });
      } else {
        res.send({ status: true, message: "Employee created successfully" });
      }
    });
  });


//view the Records
server.get("/employee", (req, res) => {
    var sql = "SELECT * FROM Employee";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
 
 
//Search the Records
server.get("/api/employee/:id", (req, res) => {
    var empolyeeid = req.params.emp_id;
    var sql = "SELECT name, phone, email, emp_id, department_id, job_title where emp_id=" +empolyeeid
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

server.get("/api/employee/:managerid", (req, res) => {
    var managerid = req.params.mngr_id;
    var sql = "SELECT * FROM employee WHERE manager_id=" + managerid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});
 

server.get("/api/employee/:deptartmentid", (req, res) => {
    var managerid = req.params.mngr_id;
    var sql = "SELECT * FROM employee WHERE manager_id=" + managerid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});
 

//Update the Records
server.put("/api/employee/update/:id", (req, res) => {
    let sql =
      "UPDATE employee SET name='" +
      req.body.name +
      "', course='" +
      req.body.course +
      "',fee='" +
      req.body.fee +
      "'  WHERE id=" +
      req.params.id;

    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Employee Updated Failed" });
      } else {
        res.send({ status: true, message: "Employee Updated successfully" });
      }
    });
  });


//Delete the Records
server.delete("/api/employee/delete/:id", (req, res) => {
    let sql = "DELETE FROM employee WHERE id=" + req.params.empid + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Employee Deleted Failed" });
      } else {
        res.send({ status: true, message: "Employee Deleted successfully" });
      }
    });
});
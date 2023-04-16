
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Stored Procedures
var addEmpCall = `CALL add_employee`
var deleteEmpCall = `CALL delete_employee`
var editEmpCall = `CALL edit_employee`


const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "empmanagementsyst",
});

app.post("/add", (req, res) => {
  const name = req.body.name;
  const salary = req.body.salary;
  const job_title = req.body.job_title;
  const email = req.body.email;
  const phone = req.body.phone;

    
});




//Get Method
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM csv_employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update Method
app.put("/update", (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE csv_employee SET salary = ? WHERE emp_id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Delete Method
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM csv_employee WHERE emp_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
})




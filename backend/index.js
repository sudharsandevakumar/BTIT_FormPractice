const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.listen(3000, () => {
  console.log("server running on port 3000...");
});

//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blacktulip",
});

db.connect((err) => {
  if (err) {
    console.log("connection error", err);
  } else {
    console.log("database connected...");
  }
});

//get all data

app.get("/user", (req, res) => {
  let qr = "SELECT * FROM users";
  db.query(qr, (err, result) => {
    if (err) {
      console.log("err", err);
    } else {
      if (result.length > 0) {
        res.send({
          message: "all user data",
          data: result,
        });
      }
    }
  });
});

app.get("/user/:id", (req, res) => {
  let qr = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log("err", err);
    } else {
      if (result.length > 0) {
        res.send({
          message: "all user data",
          data: result,
        });
      }
    }
  });
});

app.post("/user", (req, res) => {
  let fn = req.body.firstName;
  let ln = req.body.lastName;
  let age = req.body.age;
  let password = req.body.password;

  let qr = `INSERT INTO users (firstname, lastname, age, password) VALUES ('${fn}','${ln}','${age}','${password}');`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data inserted");
    }
  });
});

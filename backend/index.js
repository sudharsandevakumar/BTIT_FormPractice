const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.listen(3000, () => {
  console.log("server running...");
});

//databsse connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simpledb",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log(err, "dberr");
  } else {
    console.log("database connected...");
  }
});

//get all data

app.get("/user", (req, res) => {
  let qr = "SELECT * FROM user";
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
    }

    if (result.length > 0) {
      res.send({
        message: "all user data",
        data: result,
      });
    }
  });
});

app.get("/user/:id", (req, res) => {
  let gID = req.params.id;
  let qr = `SELECT * FROM user where id = ${gID}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      res.send({
        message: "get single data",
        data: result,
      });
    } else {
      res.send({
        message: "data not found",
      });
    }
  });
});

app.post("/user", (req, res) => {
  console.log(req.body, "createdata");

  let fullName = req.body.fullname;
  let email = req.body.email;
  let mb = req.body.mobile;

  let qr = `insert into user(fullname, email, mobile) values('${fullName}','${email}','${mb}')`;
  console.log(qr, "qr");

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result, "result");
      res.send({
        message: "data inserted",
      });
    }
  });
});

//update single data
app.put("/user/:id", (req, res) => {
  console.log(req.body, "updatedata");

  let gID = req.params.id;
  let fullName = req.body.fullname;
  let email = req.body.email;
  let mb = req.body.mobile;

  let qr = `UPDATE user SET fullname = '${fullName}', email = '${email}', mobile = '${mb}' where id = '${gID}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "data updated",
      });
    }
  });
});

app.delete("/user/:id", (req, res) => {
  let qID = req.params.id;
  let qr = `delete from user where id = '${qID}'`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "data deleted",
      });
    }
  });
});

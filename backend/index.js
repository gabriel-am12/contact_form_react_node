const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");
const nodemailer = require("nodemailer");
require('dotenv').config()

// .env variables
const HOST = process.env.DB_HOST || "127.0.0.1";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "password" // <= set your db password here
const PORT = process.env.DB_PORT || 3001
const FROM_EMAIL = process.env.FROM_EMAIL_OPTIONS || "email" // <= set the from email here

// connection pool
const db = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: "msb_contact_form"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const file = req.body.file;

  const sqlInsert = "INSERT INTO contacts (name, email, phone, message, file) VALUES(?,?,?,?,?)"
  db.query(sqlInsert, [name,email,phone,message,file], (err, result) => {
    console.log(err);
  });

  //nodemailer
  const emailMessage = `
  name: ${name} , 
  email: ${email} , 
  phone: ${phone}, 
  message: ${message}, 
  file: ${file}`

  let transpoter = nodemailer.createTransport({
    service: 'gmail', // choose your email provider
    auth: {
      user: 'gabrielaug4@gmail.com', //set your the email your want us here
      pass: 'aafdysztzgxjsqmx' /* set your app password here
      if service = gmail, check the following link:
      https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa
      */
    }
  });
  let mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: message,
    text: emailMessage,
  
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info.response);
  });

});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM contacts"
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});


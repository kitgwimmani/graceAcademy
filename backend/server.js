const express = require("express");
const cors = require("cors");
const mysql = require("mysql")
const app = express();

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "grace_academy_db"
})

app.get("/", (req, res) => {
    const sql = "SELECT * from user";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/createUser', (req, res) => {
    const sql = "INSERT INTO user (`name`,`email`,`role`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.email,
        req.body.role
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening")
})
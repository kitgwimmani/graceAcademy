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

// user user user user user user
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

app.put('/updateUser/:id', (req, res) => {
    const sql = "UPDATE user set `name` = ?, `email` = ?, `role` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.email,
        req.body.role
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/user/:id', (req, res) => {
    const sql = "DELETE FROM user where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//#####################################################################

// category category category category
app.get("/category", (req, res) => {
    const sql = "SELECT * from category";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/createCategory', (req, res) => {
    const sql = "INSERT INTO category (`name`,`description`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.description
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateCategory/:id', (req, res) => {
    const sql = "UPDATE category set `name` = ?, `description` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.description
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/category/:id', (req, res) => {
    const sql = "DELETE FROM category where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// custodian custodian custodian
app.get("/custodian", (req, res) => {
    const sql = "SELECT * from custodian";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/createCustodian', (req, res) => {
    const sql = "INSERT INTO custodian (`name`,`email`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateCustodian/:id', (req, res) => {
    const sql = "UPDATE custodian set `name` = ?, `email` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.email
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/custodian/:id', (req, res) => {
    const sql = "DELETE FROM custodian where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// location location location
app.get("/location", (req, res) => {
    const sql = "SELECT * from location";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/createLocation', (req, res) => {
    const sql = "INSERT INTO location (`name`) VALUES (?)";
    const values = [
        req.body.name, 
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateLocation/:id', (req, res) => {
    const sql = "UPDATE location set `name` = ? where id = ?";
    const values = [
        req.body.name, 
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/location/:id', (req, res) => {
    const sql = "DELETE FROM location where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// unit unit unit 
app.get("/unit", (req, res) => {
    const sql = "SELECT * from unit";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/createUnit', (req, res) => {
    const sql = "INSERT INTO unit (`name`,`description`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.description
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateUnit/:id', (req, res) => {
    const sql = "UPDATE unit set `name` = ?, `description` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.description
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/unit/:id', (req, res) => {
    const sql = "DELETE FROM unit where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

app.listen(8081, () => {
    console.log("listening")
})
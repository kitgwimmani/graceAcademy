const express = require("express");
const cors = require("cors");
const mysql = require("mysql")
const app = express();

app.use(express.json())
app.use(cors());

/* const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "grace_academy_db"
}) */

const db = mysql.createConnection({
    host: "sql5.freesqldatabase.com",
    user: "sql5684151",
    password: "GSUq5prPGm",
    database: "sql5684151"
}) 



// user user user user user user
app.get("/", (req, res) => {
    const sql = "SELECT * from user";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getUser/:id", (req, res) => {
    const sql = "SELECT * FROM user WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

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

app.get("/getCategory/:id", (req, res) => {
    const sql = "SELECT * FROM category WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

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

app.get("/getCustodian/:id", (req, res) => {
    const sql = "SELECT * FROM custodian WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


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
app.get("/getLocation/:id", (req, res) => {
    const sql = "SELECT * FROM location WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

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

app.get("/getUnit/:id", (req, res) => {
    const sql = "SELECT * FROM unit WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

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

//##################################################################33

// product
app.get("/product", (req, res) => {
    const sql = "SELECT * from product";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getProduct/:id", (req, res) => {
    const sql = "SELECT * FROM product WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createProduct', (req, res) => {
    const sql = "INSERT INTO product (`name`,`category`,`consumable`,`traceable`,`description`,`expiration`,`threshold`,`serial_number`,`isbn`,`subject`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.category,
        req.body.consumable,
        req.body.traceable,
        req.body.description,
        req.body.expiration,
        req.body.threshold,
        req.body.serial_number,
        req.body.isbn,
        req.body.subject
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateProduct/:id', (req, res) => {
    const sql = "UPDATE product set `name` = ?,`category`= ?,`consumable`= ?,`traceable`= ?,`description`= ?,`expiration`= ?,`threshold`= ?,`serial_number`= ?,`isbn`= ?,`subject`= ? where id = ?";
    const values = [
        req.body.name, 
        req.body.category, 
        req.body.consumable, 
        req.body.traceable, 
        req.body.description,
        req.body.expiration,  
        req.body.threshold,
        req.body.serial_number,
        req.body.isbn,
        req.body.subject

    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/product/:id', (req, res) => {
    const sql = "DELETE FROM product where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// supplier supplier supplier supplier
app.get("/supplier", (req, res) => {
    const sql = "SELECT * from supplier";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getSupplier/:id", (req, res) => {
    const sql = "SELECT * FROM supplier WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createSupplier', (req, res) => {
    const sql = "INSERT INTO supplier (`name`,`address`,`phone`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.address,
        req.body.phone
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateSupplier/:id', (req, res) => {
    const sql = "UPDATE supplier set `name` = ?, `address` = ?, `phone` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.address, 
        req.body.phone
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/supplier/:id', (req, res) => {
    const sql = "DELETE FROM supplier where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// receiver receiver receiver receiver
app.get("/receiver", (req, res) => {
    const sql = "SELECT * from receiver";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getReceiver/:id", (req, res) => {
    const sql = "SELECT * FROM receiver WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createReceiver', (req, res) => {
    const sql = "INSERT INTO receiver (`name`,`address`,`phone`) VALUES (?)";
    const values = [
        req.body.name, 
        req.body.address,
        req.body.phone
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateReceiver/:id', (req, res) => {
    const sql = "UPDATE receiver set `name` = ?, `address` = ?, `phone` = ? where id = ?";
    const values = [
        req.body.name, 
        req.body.address, 
        req.body.phone
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/receiver/:id', (req, res) => {
    const sql = "DELETE FROM receiver where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

// supply supply supply supply
app.get("/supply", (req, res) => {
    const sql = "SELECT * from supply";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/getSupply/:id", (req, res) => {
    const sql = "SELECT * FROM supply WHERE id = ? LIMIT 1";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/createSupply', (req, res) => {
    const sql = "INSERT INTO supply (`product`,`supplier`,`unit`,`quantity`,`expiry_date`,`serial_number`,`isbn`,`barcode`,`remark`, `supply_date`) VALUES (?)";
    const values = [
        req.body.product, 
        req.body.supplier,
        req.body.unit,
        req.body.quantity,
        req.body.expiry_date,
        req.body.serial_number,
        req.body.isbn,
        req.body.barcode,
        req.body.remark,
        req.body.supply_date
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateSupply/:id', (req, res) => {
    const sql = "UPDATE supply set `product` = ?, `supplier` = ?, `unit` = ? , `quantity` = ? , `expiry_date` = ? , `serial_number` = ? , `isbn` = ? , `barcode` = ? , `remark` = ? , `supply_date` = ? where id = ?";
    const values = [
        req.body.product, 
        req.body.supplier, 
        req.body.unit,
        req.body.quantity,
        req.body.expiry_date,
        req.body.serial_number,
        req.body.isbn,
        req.body.barcode,
        req.body.remark,
        req.body.supply_date
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/supply/:id', (req, res) => {
    const sql = "DELETE FROM supply where id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##################################################################33

app.listen(3306, () => {
    console.log("listening")
})
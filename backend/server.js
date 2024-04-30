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

/*const db = mysql.createConnection({
    host: "https://cloudsync.com.ng",
    user: "cloudsyn_kayceemani",
    password: "",
    database: "cloudsyn_grace_academy_db"
}) */


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
    const sql = "SELECT * from category ORDER BY name ASC";
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
    const sql = "SELECT * from unit ORDER BY name ASC";
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
    const sql = "SELECT * from product ORDER BY name ASC";
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
    const sql = "INSERT INTO product (`name`,`category`,`consumable`,`traceable`,`description`,`expiration`,`threshold`,`serial_number`,`isbn`,`barcode`,`subject`, `pub_brand`, `url`) VALUES (?)";
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
        req.body.barcode,
        req.body.subject,
        req.body.pub_brand,
        req.body.url
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/updateProduct/:id', (req, res) => {
    const sql = "UPDATE product set `name` = ?,`category`= ?,`consumable`= ?,`traceable`= ?,`description`= ?,`expiration`= ?,`threshold`= ?,`serial_number`= ?,`isbn`= ?,`barcode`= ?,`subject`= ?,`pub_brand`= ?, `url`= ? where id = ?";
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
        req.body.barcode,
        req.body.subject,
        req.body.pub_brand,
        req.body.url

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
    const sql = "SELECT * from supplier ORDER BY name ASC";
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
    const sql = "SELECT * from receiver ORDER BY name ASC";
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

app.get("/getProductSupplied/:id", (req, res) => {
    const sql = "SELECT * FROM inventory WHERE product_id = ? ";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

//### Inventory moveItem

app.post('/moveItem', (req, res) => {
    const sql = "INSERT INTO transfer (`product_id`,`location_id`,`custodian_id`,`date_moved`,`date_expected`,`user_id`,`unit_id`,`quantity`) VALUES (?)";
    const values = [
        req.body.id, 
        req.body.location, 
        req.body.custodian, 
        req.body.dateMoved, 
        req.body.dateExpected, 
        req.body.unit,
        req.body.unit,
        req.body.quantity
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.get("/getProductUnitSums/:id", (req, res) => {
    const sql = "SELECT id, unit, sum(quantity) quantity FROM inventory WHERE product_id = ?  GROUP BY (unit)";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.get("/getProductUnits/:id", (req, res) => {
    const sql = "SELECT id, unit FROM inventory WHERE product_id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.get("/getProductCustodians/:id", (req, res) => {
    const sql = "SELECT product_id, custodian_id, location_id, quantity, date_moved, date_expected, c.name as cname, l.name as lname, u.name as tunit FROM transfer, custodian c, location l, unit u WHERE product_id = ? and c.id = transfer.custodian_id and l.id = transfer.location_id and u.id = transfer.unit_id";
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

//####################### DAMAGE TYPE ############################
app.get("/damage_category", (req, res) => {
    const sql = "SELECT * from damage_category";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//######################################################

//############## INVENTORY REPORTS ########### INVENTORY REPORTS ############# INVENTORY REPORTS ######### REPORTS
app.get("/inventory", (req, res) => {
    const sql = "SELECT * from inventory ORDER BY item ASC";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//### STOCK LEVELS ################################/
app.get("/stock_level", (req, res) => {
    const sql = "SELECT * from stock_level where quantity<=threshold or reorder_status=1";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##########################

//REORDER updateReorderStatus

app.put('/updateReorderStatus/:id', (req, res) => {
    const sql = "UPDATE product set `reorder_status` = ? where id = ?";
    const values = [
        req.body.stat, 
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//########################

//### EXPIRATION STATUS ################################/
app.get("/expiration_status", (req, res) => {
    const sql = "SELECT * from expiration_status WHERE TRIM(expiry_date) != ''";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##########################

//### PAST RETURN DATE ################################/
app.get("/post_date", (req, res) => {
    const sql = "SELECT * FROM transfer where date_expected < CURRENT_DATE";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//##########################

//####################3 REPORTS REPORTS REPORTS ##############################
app.get("/supply_report", (req, res) => {
    const sql = "SELECT * from supply_report";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/transfer_report", (req, res) => {
    const sql = "SELECT * from transfer_report";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//###########################################3333


app.listen(8081, () => {
    console.log("listening")
})
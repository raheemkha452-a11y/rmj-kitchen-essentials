const express = require("express");
const db = require("../database/database");

const router = express.Router();

// ================= PLACE ORDER =================

router.post("/orders", (req, res) => {

    const {
        fullName,
        email,
        phone,
        province,
        city,
        address,
        payment,
        total,
        items
    } = req.body;

    db.run(
        `INSERT INTO orders
        (fullName,email,phone,province,city,address,payment,total,items)
        VALUES(?,?,?,?,?,?,?,?,?)`,
        [
            fullName,
            email,
            phone,
            province,
            city,
            address,
            payment,
            total,
            JSON.stringify(items)
        ],
        function(err){

            if(err){

                return res.json({
                    success:false,
                    message:"Database Error"
                });

            }

            res.json({
                success:true,
                message:"Order Placed Successfully!"
            });

        }
    );

});

// ================= GET ALL ORDERS =================

router.get("/orders", (req,res)=>{

    db.all(
        "SELECT * FROM orders ORDER BY id DESC",
        [],
        (err,rows)=>{

            if(err){
                return res.json([]);
            }

            rows.forEach(order=>{
                order.items = JSON.parse(order.items || "[]");
            });

            res.json(rows);

        }
    );

});

// ================= GET MY ORDERS =================

router.get("/my-orders/:phone",(req,res)=>{

    const phone = req.params.phone;

    db.all(

        "SELECT * FROM orders WHERE phone=? ORDER BY id DESC",

        [phone],

        (err,rows)=>{

            if(err){

                return res.json([]);

            }

            rows.forEach(order=>{

                order.items = JSON.parse(order.items || "[]");

            });

            res.json(rows);

        }

    );

});

// ================= GET SINGLE ORDER =================

router.get("/orders/:id",(req,res)=>{

    db.get(

        "SELECT * FROM orders WHERE id=?",

        [req.params.id],

        (err,row)=>{

            if(err || !row){

                return res.json({
                    success:false,
                    message:"Order Not Found"
                });

            }

            row.items = JSON.parse(row.items || "[]");

            res.json(row);

        }

    );

});

// ================= UPDATE STATUS =================

router.put("/orders/:id",(req,res)=>{

    db.run(

        "UPDATE orders SET status=? WHERE id=?",

        [req.body.status,req.params.id],

        function(err){

            if(err){

                return res.json({
                    success:false,
                    message:"Status Update Failed"
                });

            }

            res.json({
                success:true,
                message:"Status Updated Successfully!"
            });

        }

    );

});

// ================= DELETE ORDER =================

router.delete("/orders/:id",(req,res)=>{

    db.run(

        "DELETE FROM orders WHERE id=?",

        [req.params.id],

        function(err){

            if(err){

                return res.json({
                    success:false,
                    message:"Delete Failed"
                });

            }

            res.json({
                success:true,
                message:"Order Deleted Successfully!"
            });

        }

    );

});

module.exports = router;
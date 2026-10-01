const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/database");

const router = express.Router();

/* ===========================
   REGISTER
=========================== */

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: "All fields are required."
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    db.run(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hashPassword],
        function (err) {

            if (err) {
                return res.json({
                    success: false,
                    message: "Email already exists."
                });
            }

            res.json({
                success: true,
                message: "Registration Successful."
            });

        }
    );

});


/* ===========================
   LOGIN
=========================== */

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.json({
            success: false,
            message: "Please enter email and password."
        });

    }

    db.get(

        "SELECT * FROM users WHERE email = ?",

        [email],

        async (err, user) => {

            if (err) {

                return res.json({
                    success: false,
                    message: "Database Error."
                });

            }

            if (!user) {

                return res.json({
                    success: false,
                    message: "User not found."
                });

            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.json({
                    success: false,
                    message: "Incorrect Password."
                });

            }

            res.json({

                success: true,
                message: "Login Successful.",

                user: {

                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role

                }

            });

        }

    );

});
// ===========================
// CREATE ADMIN (Run Only Once)
// ===========================

router.get("/create-admin", async (req, res) => {

    const password = await bcrypt.hash("admin123", 10);

    db.run(
        "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
        [
            "Administrator",
            "admin@rmj.com",
            password,
            "admin"
        ],
        function(err){

            if(err){
                return res.send("Admin already exists.");
            }

            res.send("Admin Created Successfully.");
        }
    );

});
// ===========================
// CHECK EMAIL
// ===========================

router.post("/check-email", (req, res) => {

    const { email } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {

            if (err) {

                return res.json({
                    success: false,
                    message: "Database Error"
                });

            }

            if (!user) {

                return res.json({
                    success: false,
                    message: "Email not found."
                });

            }

            res.json({
                success: true
            });

        }

    );

});
// ===========================
// RESET PASSWORD
// ===========================

router.post("/reset-password", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.json({
            success: false,
            message: "Missing required fields."
        });

    }

    const hashPassword = await bcrypt.hash(password, 10);

    db.run(
        "UPDATE users SET password=? WHERE email=?",
        [hashPassword, email],
        function(err){

            if(err){

                return res.json({
                    success:false,
                    message:"Database Error."
                });

            }

            if(this.changes===0){

                return res.json({
                    success:false,
                    message:"Email not found."
                });

            }

            res.json({
                success:true,
                message:"Password Updated Successfully."
            });

        }

    );

});

module.exports = router;
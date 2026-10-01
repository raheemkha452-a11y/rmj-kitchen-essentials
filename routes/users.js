const express = require("express");
const db = require("../database/database");

const router = express.Router();

// ================= GET ALL USERS =================

router.get("/users", (req, res) => {

    db.all(
        "SELECT id, name, email, role FROM users ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.json([]);
            }

            res.json(rows);

        }
    );

});

module.exports = router;
const express = require("express");
const db = require("../database/database");

const router = express.Router();

// ================= GET SETTINGS =================

router.get("/settings", (req, res) => {

    db.get("SELECT * FROM settings LIMIT 1", [], (err, row) => {

        if (err) {
            return res.json({
                success: false
            });
        }

        res.json(row);

    });

});

// ================= UPDATE SETTINGS =================

router.put("/settings", (req, res) => {

    const {
        site_name,
        site_email,
        site_phone,
        site_address,
        working_hours,
        facebook,
        instagram,
        youtube,
        tiktok
    } = req.body;

    db.run(
        `UPDATE settings SET

        site_name=?,
        site_email=?,
        site_phone=?,
        site_address=?,
        working_hours=?,
        facebook=?,
        instagram=?,
        youtube=?,
        tiktok=?

        WHERE id=1`,

        [
            site_name,
            site_email,
            site_phone,
            site_address,
            working_hours,
            facebook,
            instagram,
            youtube,
            tiktok
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
                message:"Settings Updated Successfully!"
            });

        }

    );

});

module.exports = router;
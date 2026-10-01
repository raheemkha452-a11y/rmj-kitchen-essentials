const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/database");

const router = express.Router();

router.put("/change-password", (req, res) => {

    const { currentPassword, newPassword } = req.body;

    db.get(

        "SELECT * FROM users WHERE role='admin' LIMIT 1",

        [],

        async (err, admin) => {

            if (err || !admin) {

                return res.json({
                    success:false,
                    message:"Admin Not Found"
                });

            }

            const match = await bcrypt.compare(currentPassword, admin.password);

            if(!match){

                return res.json({
                    success:false,
                    message:"Current Password Incorrect"
                });

            }

            const hashPassword = await bcrypt.hash(newPassword,10);

            db.run(

                "UPDATE users SET password=? WHERE id=?",

                [
                    hashPassword,
                    admin.id
                ],

                function(err){

                    if(err){

                        return res.json({
                            success:false,
                            message:"Password Update Failed"
                        });

                    }

                    res.json({

                        success:true,
                        message:"Password Changed Successfully"

                    });

                }

            );

        }

    );

});

module.exports = router;
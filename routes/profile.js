const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../database/database");

const router = express.Router();

// Upload Folder

const storage = multer.diskStorage({

    destination:"uploads/",

    filename:(req,file,cb)=>{

        cb(null,Date.now()+path.extname(file.originalname));

    }

});

const upload = multer({storage});

// ================= GET PROFILE =================

router.get("/profile",(req,res)=>{

    db.get(
        "SELECT * FROM admin_profile LIMIT 1",
        [],
        (err,row)=>{

            if(err){

                return res.json({});

            }

            res.json(row || {});

        }
    );

});

// ================= UPDATE PROFILE =================

router.put("/profile",upload.single("image"),(req,res)=>{

    const {name,email,phone}=req.body;

    let image="";

    if(req.file){

        image="/uploads/"+req.file.filename;

    }

    db.get(
        "SELECT * FROM admin_profile LIMIT 1",
        [],
        (err,row)=>{

            if(!row){

                db.run(
                    `INSERT INTO admin_profile
                    (name,email,phone,image)
                    VALUES(?,?,?,?)`,
                    [
                        name,
                        email,
                        phone,
                        image
                    ]
                );

            }else{

                db.run(
                    `UPDATE admin_profile
                    SET
                    name=?,
                    email=?,
                    phone=?,
                    image=CASE
                        WHEN ?=''
                        THEN image
                        ELSE ?
                    END`,
                    [
                        name,
                        email,
                        phone,
                        image,
                        image
                    ]
                );

            }

            res.json({

                success:true,

                message:"Profile Updated Successfully"

            });

        }

    );

});

module.exports = router;
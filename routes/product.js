const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../database/database");

const router = express.Router();

// Image Upload Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Add Product
router.post("/products", upload.single("image"), (req, res) => {

    const { name, price, category, stock, description } = req.body;

    const image = req.file ? req.file.filename : "";

    db.run(
        `INSERT INTO products(name,price,image,description,category,stock)
        VALUES(?,?,?,?,?,?)`,
        [name, price, image, description, category, stock],
        function(err){

            if(err){
                return res.json({
                    success:false,
                    message:"Database Error"
                });
            }

            res.json({
                success:true,
                message:"Product Added Successfully."
            });

        }
    );

});

// Get Products
router.get("/products", (req, res) => {

    db.all(
        "SELECT * FROM products ORDER BY id DESC",
        [],
        (err, rows) => {

            if(err){
                return res.json([]);
            }

            res.json(rows);

        }
    );

});
// Get Single Product
router.get("/products/:id", (req, res) => {

    db.get(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id],
        (err, row) => {

            if (err || !row) {
                return res.json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.json(row);

        }
    );

});


// Delete Product
// Update Product
router.put("/products/:id", upload.single("image"), (req, res) => {

    const { name, price, category, stock, description } = req.body;

    if (req.file) {

        db.run(
            `UPDATE products
             SET name=?, price=?, category=?, stock=?, description=?, image=?
             WHERE id=?`,
            [
                name,
                price,
                category,
                stock,
                description,
                req.file.filename,
                req.params.id
            ],
            function(err) {

                if (err) {
                    return res.json({
                        success: false,
                        message: "Database Error"
                    });
                }

                res.json({
                    success: true,
                    message: "Product Updated Successfully."
                });

            }
        );

    } else {

        db.run(
            `UPDATE products
             SET name=?, price=?, category=?, stock=?, description=?
             WHERE id=?`,
            [
                name,
                price,
                category,
                stock,
                description,
                req.params.id
            ],
            function(err) {

                if (err) {
                    return res.json({
                        success: false,
                        message: "Database Error"
                    });
                }

                res.json({
                    success: true,
                    message: "Product Updated Successfully."
                });

            }
        );

    }

});
router.delete("/products/:id", (req, res) => {

    db.run(
        "DELETE FROM products WHERE id = ?",
        [req.params.id],
        function(err){

            if(err){
                return res.json({
                    success:false,
                    message:"Database Error"
                });
            }

            res.json({
                success:true,
                message:"Product Deleted Successfully."
            });

        }
    );

});

module.exports = router;
const express = require("express");
const db = require("../database/database");

const router = express.Router();

// Add Review

router.post("/reviews", (req,res)=>{

const {product_id,name,rating,review}=req.body;

db.run(

`INSERT INTO reviews(product_id,name,rating,review)
VALUES(?,?,?,?)`,

[product_id,name,rating,review],

function(err){

if(err){

return res.json({
success:false,
message:"Review Failed"
});

}

res.json({
success:true,
message:"Review Added Successfully"
});

});

});

// Get Reviews

router.get("/reviews/:id",(req,res)=>{

db.all(

"SELECT * FROM reviews WHERE product_id=? ORDER BY id DESC",

[req.params.id],

(err,rows)=>{

if(err) return res.json([]);

res.json(rows);

});

});

module.exports=router;
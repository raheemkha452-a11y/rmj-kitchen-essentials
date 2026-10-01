const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const db = require("./database/database");
const settingsRoutes = require("./routes/settings");
const profileRoutes = require("./routes/profile");
const changePasswordRoutes = require("./routes/change-password");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const reviewRoutes=require("./routes/review");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", settingsRoutes);
app.use("/api", profileRoutes);
app.use("/api", changePasswordRoutes);
app.use("/api", reviewRoutes);


// Static Files
app.use(express.static(__dirname));
// Uploads Folder
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ================= DATABASE TABLES =================

// Users Table
db.run(`
CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

email TEXT UNIQUE NOT NULL,

password TEXT NOT NULL,

role TEXT DEFAULT 'user'

)
`);

// Products Table
db.run(`
CREATE TABLE IF NOT EXISTS products(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL,

price REAL NOT NULL,

image TEXT,

description TEXT,

category TEXT,

stock INTEGER DEFAULT 0

)
`);

// Orders Table
db.run(`
CREATE TABLE IF NOT EXISTS orders(

id INTEGER PRIMARY KEY AUTOINCREMENT,

fullName TEXT,

email TEXT,

phone TEXT,

province TEXT,

city TEXT,

address TEXT,

payment TEXT,

total REAL,

items TEXT,

status TEXT DEFAULT 'Pending',

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);

// Cart Table
db.run(`
CREATE TABLE IF NOT EXISTS cart(

id INTEGER PRIMARY KEY AUTOINCREMENT,

user_id INTEGER,

product_id INTEGER,

quantity INTEGER DEFAULT 1

)
`);

// ================= WEBSITE SETTINGS =================

db.run(`
CREATE TABLE IF NOT EXISTS settings (

id INTEGER PRIMARY KEY AUTOINCREMENT,

site_name TEXT,
site_email TEXT,
site_phone TEXT,
site_address TEXT,
working_hours TEXT,
facebook TEXT,
instagram TEXT,
youtube TEXT,
tiktok TEXT

)
`);

// ================= DEFAULT SETTINGS =================

db.get("SELECT * FROM settings LIMIT 1", (err, row) => {

    if (!row) {

        db.run(`
        INSERT INTO settings
        (
            site_name,
            site_email,
            site_phone,
            site_address,
            working_hours,
            facebook,
            instagram,
            youtube,
            tiktok
        )
        VALUES
        (
            'RMJ Kitchen Essentials',
            'support@rmjstore.com',
            '+92 300 1234567',
            'Lahore, Punjab, Pakistan',
            'Monday - Saturday (9:00 AM - 7:00 PM)',
            '',
            '',
            '',
            ''
        )
        `);

    }

});

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ RMJ Server Running`);
    console.log(`🌐 http://localhost:${PORT}`);
});
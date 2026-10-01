const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "rmj.db");

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {

        console.log("❌ Database Connection Failed");
        console.log(err.message);

    } else {

        console.log("✅ SQLite Database Connected");

    }

});

db.serialize(() => {

    // ================= REVIEWS TABLE =================

db.run(`
CREATE TABLE IF NOT EXISTS reviews(

id INTEGER PRIMARY KEY AUTOINCREMENT,

product_id INTEGER,

name TEXT,

rating INTEGER,

review TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);

    // ================= ORDERS TABLE =================

    db.run(`
        CREATE TABLE IF NOT EXISTS orders (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            fullName TEXT,

            email TEXT,

            phone TEXT,

            province TEXT,

            city TEXT,

            address TEXT,

            payment TEXT,

            total INTEGER,

            items TEXT,

            status TEXT DEFAULT 'Pending',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);
    // ================= REVIEWS TABLE =================

db.run(`
CREATE TABLE IF NOT EXISTS reviews(

id INTEGER PRIMARY KEY AUTOINCREMENT,

product_id INTEGER,

name TEXT,

rating INTEGER,

review TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`);
    // ================= USERS TABLE =================

db.run(`
CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT,

email TEXT UNIQUE,

password TEXT,

role TEXT DEFAULT 'user'

)
`);

    // ================= ADMIN PROFILE TABLE =================

    db.run(`
        CREATE TABLE IF NOT EXISTS admin_profile(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT,

            email TEXT,

            phone TEXT,

            image TEXT

        )
    `);
    

    // ================= DEFAULT ADMIN PROFILE =================

    db.get(
        "SELECT * FROM admin_profile LIMIT 1",
        (err, row) => {

            if (!row) {

                db.run(`
                    INSERT INTO admin_profile
                    (
                        name,
                        email,
                        phone,
                        image
                    )
                    VALUES
                    (
                        'Admin',
                        'admin@rmj.com',
                        '+92 300 1234567',
                        ''
                    )
                `);

            }

        }
    );

});

module.exports = db;
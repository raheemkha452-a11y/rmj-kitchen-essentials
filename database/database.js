require("dotenv").config();

const { createClient } = require("@libsql/client");

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});

// --------------------------------------------------
// Compatibility wrapper
// Existing routes use db.run(), db.get(), db.all()
// --------------------------------------------------

const db = {

    run(sql, params = [], callback = () => {}) {

        client.execute({
            sql,
            args: params
        })
        .then(result => {

            const context = {
                changes: Number(result.rowsAffected || 0),
                lastID: result.lastInsertRowid
                    ? Number(result.lastInsertRowid)
                    : undefined
            };

            callback.call(context, null);

        })
        .catch(err => {
            callback.call({}, err);
        });

    },

    get(sql, params = [], callback = () => {}) {

        client.execute({
            sql,
            args: params
        })
        .then(result => {

            const row = result.rows.length > 0
                ? result.rows[0]
                : undefined;

            callback(null, row);

        })
        .catch(err => {
            callback(err);
        });

    },

    all(sql, params = [], callback = () => {}) {

        client.execute({
            sql,
            args: params
        })
        .then(result => {

            callback(null, result.rows);

        })
        .catch(err => {
            callback(err);
        });

    },

    serialize(callback) {
        callback();
    }

};

module.exports = db;
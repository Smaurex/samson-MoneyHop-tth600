const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

/*

npm init -y
npm install express mysql2 cors

*/

// Allow JSON data
app.use(express.json());


// Allow the Vite frontend (different port) to call this API
app.use(cors());


// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "exchange_desk_db"
});


// Test database connection
db.connect((err) => {

    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");

});


// ========================================
// GET - Retrieve Conversions
// ========================================

app.get("/api/conversions", (req, res) => {

    const sql = "SELECT * FROM conversions ORDER BY created_at DESC";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);

    });

});


// ========================================
// POST - Insert Conversion
// ========================================

app.post("/api/conversions", (req, res) => {

    const amount = req.body.amount;
    const from_currency = req.body.from_currency;
    const to_currency = req.body.to_currency;
    const result_amount = req.body.result_amount;


    const sql = `
        INSERT INTO conversions
        (amount, from_currency, to_currency, result_amount)
        VALUES (?, ?, ?, ?)
    `;


    db.query(
        sql,
        [amount, from_currency, to_currency, result_amount],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }


            res.status(201).json({
                message: "Conversion saved successfully",
                id: result.insertId
            });

        }
    );

});


// ========================================
// PUT - Update Conversion
// ========================================

app.put("/api/conversions/:id", (req, res) => {

    const id = Number(req.params.id);
    const { amount, from_currency, to_currency, result_amount } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid conversion ID" });
    }

    if (
        amount == null ||
        !from_currency ||
        !to_currency ||
        result_amount == null
    ) {
        return res.status(400).json({ message: "All conversion fields are required" });
    }

    const sql = `
        UPDATE conversions
        SET amount = ?, from_currency = ?, to_currency = ?, result_amount = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [amount, from_currency, to_currency, result_amount, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Conversion not found" });
            }

            res.json({ message: "Conversion updated successfully", id });
        }
    );

});


// ========================================
// DELETE - Remove Conversion
// ========================================

app.delete("/api/conversions/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid conversion ID" });
    }

    db.query("DELETE FROM conversions WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Conversion not found" });
        }

        res.json({ message: "Conversion deleted successfully", id });
    });

});


// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});

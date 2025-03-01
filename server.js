require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Database Connection Pool
const db = mysql.createPool({
  //  host: process.env.DB_HOST || 'db', // 'db' refers to the MySQL service in docker-compose
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nodedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fetch all data OR filter by name
app.get("/data", (req, res) => {
    const searchQuery = req.query.name;
    let query = "SELECT * FROM items";
    let params = [];

    if (searchQuery) {
        query += " WHERE name LIKE ?";
        params.push(`%${searchQuery}%`);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add new data
app.post("/add", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) return res.status(400).json({ error: "All fields are required" });

    db.query("INSERT INTO items (name, description) VALUES (?, ?)", [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data inserted successfully!", id: result.insertId });
    });
});

// Update data
app.put("/update/:id", (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name || !description) return res.status(400).json({ error: "All fields are required" });

    db.query("UPDATE items SET name = ?, description = ? WHERE id = ?", [name, description, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data updated successfully!" });
    });
});

// Delete data
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
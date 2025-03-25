// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { pool } = require('./config/database');
const { migrationsRun } = require('./db_migrations/migrations_run');

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Run migrations
migrationsRun();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { routes } = require('./api/routes');
const { migrationsRun } = require('./db_migrations/migrations_run');

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Run database migrations
migrationsRun();
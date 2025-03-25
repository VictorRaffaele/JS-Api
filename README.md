# Docker Node.js Project

This project sets up a Node.js application with a PostgreSQL database using Docker. 

## Project Structure

- `src/app.js`: Entry point of the Node.js application.
- `src/api`: Routes configs used by application.
- `src/config/database.js`: Configuration for PostgreSQL database connection.
- `docker/nodejs/Dockerfile`: Dockerfile for building the Node.js application container.
- `.env`: Environment variables for the project.
- `.dockerignore`: Files and directories to ignore when building the Docker image.
- `docker-compose.yml`: Defines the services for the Docker containers.
- `package.json`: Configuration file for npm.

## Setup Instructions

1. Clone the repository.
2. Navigate to the project directory.
3. Create a `.env` file with your database credentials.
4. Run `docker-compose up` to start the application and database.

## Usage

Access the Node.js application at `http://localhost:3000`. The application will connect to the PostgreSQL database as specified in the configuration.
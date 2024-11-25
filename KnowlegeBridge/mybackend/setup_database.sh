#!/bin/bash

# Database credentials
DB_USER="postgres"
DB_PASSWORD="123"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="web2"
SCHEMA="scheamaweb"

# Function to check if psql is installed
check_psql_installed() {
    if ! command -v psql &> /dev/null; then
        echo "psql could not be found. Please install PostgreSQL before running this script."
        exit 1
    fi
}

# Function to create the database
create_database() {
    echo "Creating database '$DB_NAME'..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -p $DB_PORT -c "CREATE DATABASE $DB_NAME;"
}

# Function to create schema, tables, and insert data
setup_database() {
    echo "Setting up the database schema and tables..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -p $DB_PORT <<EOF
    -- Set schema
    CREATE SCHEMA IF NOT EXISTS $SCHEMA;

    -- Switch to the schema
    SET search_path TO $SCHEMA;

    -- Create users table
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        passwort VARCHAR(255),
        rolle VARCHAR(255)
    );

    -- Insert sample data into users table
    INSERT INTO users (id, username, email, passwort, rolle)
    VALUES
        (2, 'Waro', 'waro@', '123', 'Admin'),
        (3, 'Waro2', 'waro@2', '123', 'Editor')
    ON CONFLICT (id) DO NOTHING;

    -- Create fragen table
    CREATE TABLE IF NOT EXISTS fragen (
        id SERIAL PRIMARY KEY,
        frageStellung TEXT,
        antwort1 TEXT,
        antwort2 TEXT,
        antwort3 TEXT,
        antwort4 TEXT
    );

    -- Create users_ergebnis table
    CREATE TABLE IF NOT EXISTS users_ergebnis (
        id SERIAL PRIMARY KEY,
        ergebnis INT,
        username VARCHAR(255),
        status VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES users (username)
    );
EOF
}

# Main script execution
check_psql_installed

echo "Starting database setup process..."

# Create the database
create_database

# Set up schema, tables, and data
setup_database

echo "Database setup complete!"

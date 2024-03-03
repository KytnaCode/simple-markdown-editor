#!/bin/sh

psql << EOF
CREATE USER api WITH PASSWORD '$API_PASSWORD';
CREATE DATABASE app WITH OWNER = api;
GRANT ALL PRIVILEGES ON DATABASE app TO api;
EOF

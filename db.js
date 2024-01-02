require('dotenv').config();
const mongoose = require('mongoose');

const protocol = 'mongodb+srv';
const host = process.env.DB_HOST;

function connect() {
    mongoose.connect(`${protocol}://${host}`, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
    });
}

function disconnect() {
    mongoose.connection.close();
}

module.exports = {
    connect,
    disconnect
};

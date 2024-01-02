const mongoose = require('mongoose');

const addressScheme = new mongoose.Schema({
    street: String,
    city: String,
});

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
	address: addressScheme,
	email: {
        type: String,
        lowercase: true
    },
});

module.exports = mongoose.model('supplier', supplierSchema);
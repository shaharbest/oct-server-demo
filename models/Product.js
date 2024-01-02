const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'supplier',
    }
});

module.exports = mongoose.model('product', productSchema);
const db = require('./db');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const User = require('./models/User');

main();

async function main() {
    db.connect();
    await resetDB();
    db.disconnect();
}

async function resetDB() {
    await cleanDB();
    await addDataSample();
}

async function addDataSample() {
    const dataSample = require('./dataSample.json');

    const suppliersSample = dataSample.suppliers;

    console.log('inserting suppliers sample...');
    const suppliers = await Supplier.insertMany(suppliersSample);
    console.log('suppliers were inserted');

    const productsSample = dataSample.products;

    productsSample.forEach(p => {
        const supplier = suppliers.find(s => s.name === p.supplierName);
        delete p.supplierName;
        p.supplier = supplier.id;
    });

    console.log('inserting products sample...');
    await Product.insertMany(productsSample);
    console.log('products were inserted');
}

async function cleanDB() {
    console.log('cleanning db...');
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('db is clean');
}

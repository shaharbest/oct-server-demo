const db = require('./db');
const express = require('express');
const path = require('path');
const port = 5000;

db.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ require: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => res.send('pong'));
app.get('/secret', (req, res) => res.send('I like cheese'));
app.use('/suppliers', require('./routes/suppliersRoutes'));
app.use('/products', require('./routes/productsRoutes'));
app.use('/users', require('./routes/usersRoutes'));

app.listen(port, () => {
    console.log('listen to port', port);
});
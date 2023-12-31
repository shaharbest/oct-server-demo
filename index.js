const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors('*'));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => console.log('listen to', port));
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors('*'));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/pita', (_, res) => res.send('humus'));
app.get('/nisim', (_, res) => res.send('shlomo'));

app.listen(port, () => console.log('listen to', port));

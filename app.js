'use strict';

const express = require('express');
const app = express();
const port = 3000;

const { modificaDati } = require('./script.js')

app.use(express.json());

app.get('/dati', (req, res) => {
    const responseData = { message: 'CIAO MONDO' };

    res.json(responseData);
});

app.post('/modify', (req, res) => {
    res.json('CIAO ' + req.body.name);
})

app.post('/modifyScript', modificaDati)

app.listen(port, () => {
    console.log('Server in ascolto')
})

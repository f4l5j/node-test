'use strict';

import express, { json } from 'express';
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'zbeffore_test-candidati',
    password: 'z@w3%5TK{6*_',
    database: 'zbeffore_test-candidati'
});


// Connessione al database
connection.connect((err) => {
    if (err) {
        console.error('Errore durante la connessione al database: ', err);
        return;
    }
    console.log('Connessione al database riuscita');
});

app.use(json());

app.get('/dati', (req, res) => {
    connection.query('SELECT * FROM etichette', (error, results) => {
        if (error) {
            console.error('Errore durante la query al database:', error);
            return;
        }
        res.json(results);
        connection.end();
    });
})


app.listen(port, () => {
    console.log('Server in ascolto')
})

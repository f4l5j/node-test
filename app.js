'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'pro.freedb.tech',
    user: 'freedb_testo',
    password: '6R9YqVgVeXdP@*5',
    database: 'freedb_testdfsvsdv'
});


// Connessione al database
connection.connect((err) => {
    if (err) {
        console.error('Errore durante la connessione al database: ', err);
        return;
    }
    console.log('Connessione al database riuscita');
});

app.use(express.json());

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

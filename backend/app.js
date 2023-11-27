'use strict';

import express, { json } from 'express';
import cors from "cors";
const app = express();
const port = 3000;
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_testo',
    password: '6R9YqVgVeXdP@*5',
    database: 'freedb_testdfsvsdv'
});

connection.connect((err) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err);
        return;
    }
})

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.sendFile(-__dirname + '/frontend/index.html');
});

app.get('/api/v1/dati', (req, res) => {
    connection.query('SELECT * FROM etichette', (error, results, fields) => {
        if (error) {
            console.error('Errore durante la query al database:', error);
            return;
        }
        else {
            connection.end();
            res.json(results);

        }
    });
})

app.listen(port, () => {
    console.log('Server in ascolto')
})
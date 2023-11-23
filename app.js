'use strict';

import express, { json } from 'express';
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

app.use(json());

app.get('/api/v1/dati', (req, res) => {
    connection.query('SELECT * FROM etichette', (error, results, fields) => {
        if (error) {
            console.error('Errore durante la query al database:', error);
            res.status(500).send('Errore interno del server', error);
            return;
        }

        // Elabora i risultati della query e invia la risposta
        res.json(results);
        connection.end();
    });
})

app.listen(port, () => {
    console.log('Server in ascolto')
})
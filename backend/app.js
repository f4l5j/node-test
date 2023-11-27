'use strict';

import express, { json } from 'express';
import * as bodyParser from "express";
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import cors from "cors";
const app = express();
const port = 3000;
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_testo',
    password: '6R9YqVgVeXdP@*5',
    database: 'freedb_testdfsvsdv',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err);
        return;
    }
    else{
        console.log('Connessione effettuata con successo')
    }
})

app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('../frontend'))

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../frontend','index.html')
    res.sendFile(indexPath);
});

app.get('/api/v1/dati', (req, res) => {
    connection.query('SELECT * FROM etichette', (error, results, fields) => {
        if (error) {
            console.error('Errore durante la query al database:', error);
            return;
        }
        res.json(results)
    });
    connection.end();
})

app.listen(port, () => {
    console.log('Server in ascolto')
})
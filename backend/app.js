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

const connectionConfig = {
    host: 'sql.freedb.tech',
    user: 'freedb_testo',
    password: '6R9YqVgVeXdP@*5',
    database: 'freedb_testdfsvsdv',
    port: 3306
};

app.use(cors());
app.use(json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('../frontend'))

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../frontend','index.html')
    res.sendFile(indexPath);
});

app.get('/api/v1/dati', async (req, res) => {
    const query = 'SELECT * FROM your_table';
    try {
        const connection = await mysql.createConnection(connectionConfig);
        const [rows, fields] = await connection.execute(query);
        await connection.end();
        res.json(rows);
        console.log('Connessione eseguita. Chiusura eseguita. Dati spediti')
    } catch (error) {
        console.error('Errore nella query:', error.message);
        res.status(500).json({error: 'Errore nella query'});
    }
})

app.listen(port, () => {
    console.log('Server in ascolto')
})
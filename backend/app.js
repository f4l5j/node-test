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
    host: 'mysql-ce2fb19-testnodejs.a.aivencloud.com',
    port: '20440',
    user: 'avnadmin',
    ssl: {
        ca: 'MIIEQTCCAqmgAwIBAgIUMbRwXhaPc0rVzU4GgrLvzvUUkecwDQYJKoZIhvcNAQEMBQAwOjE4MDYGA1UEAwwvMzMxNmJkNmItMmRlYy00MmQxLWE0NmEtZTg5ODU4MWYyNDUwIFByb2plY3QgQ0EwHhcNMjMxMTI3MjEyMzAxWhcNMzMxMTI0MjEyMzAxWjA6MTgwNgYDVQQDDC8zMzE2YmQ2Yi0yZGVjLTQyZDEtYTQ2YS1lODk4NTgxZjI0NTAgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJjxBpXfFZBXhwxJoHVzsxx129AOYQ6NARS36XXz+SZrwyWC9EZK6So4ZRtyMyy1nObeqx8DbHhzt/2pr6bBRjEdIDfgb4nY95nnFXDocY4E+ksCpLLvu4ZxfTIJ3RgztG/xPadVJlDvWGJhbBkvnF3W4A/K0GOnLmiGgFxd4D7rvE4/hRFvUq6ein3Q0OQyKp3gMcmh9Mu71Ye4w3ntnXbztfk+CzrdOdpm5wvzzs+JlWG+y/wvS9tQmcy/VTs8zHp/DowI4MhojPgHkHFRCPlWG/mz326JIwGAonDgmLyWig5b36tWzmVTnVhYWmjH76miydKx02Gi6LdOJlrX4MhLF9CEQIGfDo6DP8pPLqgUpb1N9L8T1WLwOzfr9Qb8ICmWq5XJ5F02kPrmwV+vEsSy/KXUpIXHfTH6qcvRaTCN7ypYPq9ebnWH9HIjwy4hktUvsbxBp+ImOTD9JQe2I+aq4ZDcWrrWSURmWwVpibuW2e2/tNBZnDawpFYEq4QuCQIDAQABoz8wPTAdBgNVHQ4EFgQUPDDzW+iso0+vRTAK5wNdWmEs55owDwYDVR0TBAgwBgEB /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHZE7kZ0nAwFSXALmv+6+EpezuNh9oIMRM66VIB/4qLMa3RxnUW1SKk/VNVkDOVffFmExrz8SVKEBBipZWib3kMUwNoexoHGR6W0IXMku2MWuAc2+Yc+GWtsr5pCfJRdNLnVubZNxdIZ5CsnzlXya4TusdcBA/04uLkWbIL8k+Waw9dKv/6JZRLvtsJRIcBj9vwP5YvnnhcMdJOt70SNY91ktYtXcGo9c2GUgeVm3FSyIgumidBFA8B8T4qgfkZRMjjh2HFuf+onC1z9WXyGEAJJbecLn95zhqCAG167uEpL3+ADr8iR9/PJEaB5RtBh8OLJtgs9Sqqw0IOdpj2kqgR/keOXfBqe8ZRW7EDAZf55LB3CYyK1fONaNteQteZonJzhYq7AjrJ0aTLjZbp3dq4tBsLFfOTKCbnJfcFTUo1FIDMVY1i8/NxvCjDvAxNBbtOQsWZZe/In6ICGOiHkcTgIPdvgJvZ6YKt2HYtQh81NhtH5H5R1IObtx3GkaoU2HQ=='
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err);
        return;
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
        else {
            connection.end();
            res.json(results);

        }
    });
})

app.listen(port, () => {
    console.log('Server in ascolto')
})
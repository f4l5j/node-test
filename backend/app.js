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
        ca: 'MIIEQTCCAqmgAwIBAgIUMbRwXhaPc0rVzU4GgrLvzvUUkecwDQYJKoZIhvcNAQEM\n' +
            'BQAwOjE4MDYGA1UEAwwvMzMxNmJkNmItMmRlYy00MmQxLWE0NmEtZTg5ODU4MWYy\n' +
            'NDUwIFByb2plY3QgQ0EwHhcNMjMxMTI3MjEyMzAxWhcNMzMxMTI0MjEyMzAxWjA6\n' +
            'MTgwNgYDVQQDDC8zMzE2YmQ2Yi0yZGVjLTQyZDEtYTQ2YS1lODk4NTgxZjI0NTAg\n' +
            'UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJjxBpXf\n' +
            'FZBXhwxJoHVzsxx129AOYQ6NARS36XXz+SZrwyWC9EZK6So4ZRtyMyy1nObeqx8D\n' +
            'bHhzt/2pr6bBRjEdIDfgb4nY95nnFXDocY4E+ksCpLLvu4ZxfTIJ3RgztG/xPadV\n' +
            'JlDvWGJhbBkvnF3W4A/K0GOnLmiGgFxd4D7rvE4/hRFvUq6ein3Q0OQyKp3gMcmh\n' +
            '9Mu71Ye4w3ntnXbztfk+CzrdOdpm5wvzzs+JlWG+y/wvS9tQmcy/VTs8zHp/DowI\n' +
            '4MhojPgHkHFRCPlWG/mz326JIwGAonDgmLyWig5b36tWzmVTnVhYWmjH76miydKx\n' +
            '02Gi6LdOJlrX4MhLF9CEQIGfDo6DP8pPLqgUpb1N9L8T1WLwOzfr9Qb8ICmWq5XJ\n' +
            '5F02kPrmwV+vEsSy/KXUpIXHfTH6qcvRaTCN7ypYPq9ebnWH9HIjwy4hktUvsbxB\n' +
            'p+ImOTD9JQe2I+aq4ZDcWrrWSURmWwVpibuW2e2/tNBZnDawpFYEq4QuCQIDAQAB\n' +
            'oz8wPTAdBgNVHQ4EFgQUPDDzW+iso0+vRTAK5wNdWmEs55owDwYDVR0TBAgwBgEB\n' +
            '/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHZE7kZ0nAwFSXAL\n' +
            'mv+6+EpezuNh9oIMRM66VIB/4qLMa3RxnUW1SKk/VNVkDOVffFmExrz8SVKEBBip\n' +
            'ZWib3kMUwNoexoHGR6W0IXMku2MWuAc2+Yc+GWtsr5pCfJRdNLnVubZNxdIZ5Csn\n' +
            'zlXya4TusdcBA/04uLkWbIL8k+Waw9dKv/6JZRLvtsJRIcBj9vwP5YvnnhcMdJOt\n' +
            '70SNY91ktYtXcGo9c2GUgeVm3FSyIgumidBFA8B8T4qgfkZRMjjh2HFuf+onC1z9\n' +
            'WXyGEAJJbecLn95zhqCAG167uEpL3+ADr8iR9/PJEaB5RtBh8OLJtgs9Sqqw0IOd\n' +
            'pj2kqgR/keOXfBqe8ZRW7EDAZf55LB3CYyK1fONaNteQteZonJzhYq7AjrJ0aTLj\n' +
            'Zbp3dq4tBsLFfOTKCbnJfcFTUo1FIDMVY1i8/NxvCjDvAxNBbtOQsWZZe/In6ICG\n' +
            'OiHkcTgIPdvgJvZ6YKt2HYtQh81NhtH5H5R1IObtx3GkaoU2HQ=='
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
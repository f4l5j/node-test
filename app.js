'use strict';

import express, { json } from 'express';
const app = express();
const port = 3000;

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vhkfvlsmktjwyzuqpmdc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoa2Z2bHNta3Rqd3l6dXFwbWRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTM5MTUzMSwiZXhwIjoyMDEwOTY3NTMxfQ.OFn2kUtRIkmr1L_A8nIUkleZXLhnNPHtv4WzUwMywO0'
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(json());

const tableName = 'etichette';

app.get('/dati', async (req, res) => {
    try {
        const { data, error } = await supabase.from(tableName).select('*');

        if (error) {
            console.error(error);
        } else {
            // Serializza i risultati in formato JSON
            const jsonData = JSON.stringify(data, null, 2);
            console.log(jsonData);
            res.json(jsonData);
        }
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(port, () => {
    console.log('Server in ascolto')
})

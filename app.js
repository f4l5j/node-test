//RICHIESTA GET GESTITA DA NODE.JS

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/dati', (req, res) => {
    const response = { message: 'Ciao' }
    res.json(response)
})

app.listen(port, () => {
    console.log(`Server Express in ascolto sulla porta ${port}`);
})
//RICHIESTA GET GESTITA DA JS

const express = require('express');
const { funzioneGet } = require('./file.js')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/dati', funzioneGet)

app.listen(port, () => {
    console.log(`Server Express in ascolto sulla porta ${port}`);
})
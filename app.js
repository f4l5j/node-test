//RICHIESTA GET GESTITA DA JS

const express = require('express');
const { funzioneGet } = require('./file')
const app = express();
const port = 3000;

app.use(express.json());

app.post('/dati', funzioneGet)

app.listen(port, () => {
    console.log(`Server Express in ascolto sulla porta ${port}`);
})
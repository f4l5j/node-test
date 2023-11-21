function modificaDati(req, res) {
    if (!req.body || !req.body.message) {
        return res.status(400).json({ error: 'Messaggio mancante nel corpo della richiesta.' });
    }
    const response = { message: 'ciao' + req.body.name }
    res.json(response)
}
module.exports = { modificaDati }
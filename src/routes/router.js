const express = require('express')
const axios = require('axios')

const router = express.Router();

router.get('/api/autocomplete/:query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const autocompleteUrlPrefix = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${process.env.API_ID}&app_code=${process.env.API_CODE}&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5&query=`;

    
    axios({
        method: 'GET',
        url: autocompleteUrlPrefix + req.params.query,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(resonse => {
        res.send(JSON.stringify(resonse.data));
    }).catch(error => {
        res.status(400).send(JSON.stringify(error));
    })
})

router.use('/', express.static('client'))

module.exports = router;
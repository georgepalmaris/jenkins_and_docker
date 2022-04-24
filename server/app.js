const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 5000;

// Add cors middleware to requests, useful for different port on localhost
app.use(cors())

// Environment variables loaded from .env on startup
require('dotenv').config()

// To log the request object sent for every request
app.use((req, res, next) => {
    console.log('%s', req);
    next();
});

// Endpoint to retrieve all pokemon (Controlled by limit and offset)
app.get('/getallpokemon', (req, res) => {
    axios.get(process.env.POKEMON_API_URL + '/pokemon', { 
        params: 
        { 
            offset: req.query.offset,
            limit: req.query.limit
        } 
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

// Endpoint to retrieve data about a single pokemon.
app.get('/getpokemon', (req, res) => {
    axios.get(process.env.POKEMON_API_URL + '/pokemon/' + req.query.name)
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

// Listen on the supplied port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
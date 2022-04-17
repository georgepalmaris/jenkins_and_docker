const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 5000;

// Add cors middleware to requests, useful for different port on localhost
app.use(cors())

// Environment variables loaded from .env on startup
require('dotenv').config()

// Endpoint to retrieve weather (calls weather api)
app.get('/getweather', (req, res) => {
    axios.get(process.env.REACT_APP_API_URL + '/weather', { 
        params: 
        { 
            long: req.query.long, 
            lat: req.query.lat,
            units: 'metric',
            APPID: process.env.REACT_APP_API_KEY,
            q: 'London,uk'
        } 
    })
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
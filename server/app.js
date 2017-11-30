const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cache = [];


const app = express();
app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', function (req, res) {
    var it = req.query;
    var key = Object.keys(it)[0];
    var value = it[key];

    if (cache.hasOwnProperty([value])) {
        res.json(cache[value])
    }

    else {

        axios
            .get('http://www.omdbapi.com/?apikey=8730e0e&' + key + '=' + encodeURI(value))
            .then(function (response) {
                console.log(response.data);
                res.status(200).json(response.data);
                cache[value] = response.data;
            })
            .catch(function (error) {
                res.send('catch');
            });
    }
});




module.exports = app;
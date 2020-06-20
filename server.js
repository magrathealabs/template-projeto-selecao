const url = require('url');
const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/oauth', function (req, res) {
    const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token';
    const CLIENT_ID = '2d1dcec2c49eb2043025';
    const CLIENT_SECRET = 'fba9fb7c2345dce6d5d80f4348276f3889219953';
    const CODE = req.query.code;

    axios({
        method: 'post',
        url: GITHUB_AUTH_ACCESSTOKEN_URL,
        data: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: CODE,
        },
    })
        .then(function (response) {
            res.redirect('http://localhost:3000/oauth/?' + response.data);
        })
        .catch(function (error) {
            console.error('Error ' + error.message);
        });
});

app.listen(5000, function () {
    console.log('my-oauth listening on port 3000!');
});

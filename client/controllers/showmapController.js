const fetch = require('node-fetch');
require('dotenv').config();
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
let googleApi = process.env.GOOGLE_MAPS_API_KEY;
const showmap = (req, res, next) => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: `https://roads.googleapis.com/v1/nearestRoads?points=10.758699,106.681648|10.77,106.69&key=${googleApi}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.render('showmap.hbs', { data: JSON.stringify(response.data) })
        })
        .catch(function (error) {
            console.log(error);
        });
}
module.exports = { showmap };
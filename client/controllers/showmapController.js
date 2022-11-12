const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
const showmap = (req, res, next)=>{
    res.render('showmap.hbs');
}
module.exports = {showmap};
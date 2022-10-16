const express = require("express");
const ejs = require("ejs");
const https = require("https");
const axios = require('axios')


const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.get("/", function(req, res){
    res.render("index");
});

const http = require('http');

app.post("/", function(request, response){
    
    const data = JSON.stringify({ //<--- data to send as body
        username: "https://www.nothing.com",
        password: "hello"
    });
    const req = http.request({
        hostname: '127.0.0.1',
        port: 8080,
        path: '/api/auth/signin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }, res => {
        console.log(`statusCode: ${res.statusCode}`);
      
        res.on('data', d => {
          process.stdout.write(d);
        })
      })
      
      req.on('error', error => {
        console.error(error);
      })
      req.write(data); //<--- this line
      req.end();
    
})

// app.post("/", function(req, res){
//     var username = '';
//     var password = ''

//     const session_url = 'http://localhost:8080/api/auth/signin';

//     var config = {
//       method: 'post',
//       url: session_url,
//       //headers: { 'Authorization': 'Basic '+ encodedToken }
//     };

//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

    
// })

app.post("/dashboard", function(req,res){
    res.render("dashboard");
})

app.post("/form", function(req, res){
    let customerName = req.body.customerName;
    let customerPhone = req.body.customerPhone;
    let addressStart = req.body.addressStart;
    let addressEnd = req.body.addressEnd;
    let typeCar = req.body.typeCar;
    const data = {

    }
    res.render("form");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
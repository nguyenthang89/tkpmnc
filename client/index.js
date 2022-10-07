const express = require("express");
const ejs = require("ejs");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index");
})
app.post("/", function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    const data = {
        username: username,
        password: password
    };
    // console.log(data);
    // const jsonData = JSON.stringify(data);
    // const url = "http://localhost:8080/api/auth/signin";
    // const options = {
    //     method: "POST",
    // }
    // const request = http.request(url, options, function(response){
    //     if(response.statusCode === 200){
    //         res.render("dashboard");
    //         response.on("data", function(data){
    //             console.log(JSON.parse(data));
    //         })
    //     }
    //     else{
    //         res.redirect("/");
    //     }
    // })
    // request.write(jsonData);
    // request.end();
    res.render("dashboard");
})

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
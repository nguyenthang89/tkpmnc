const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const upload = multer({dest: 'upload/'});
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.get("/", function(req, res){
    res.render("index");
});

const http = require('http');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');

app.get("/", function(req, res){
    res.render("/index");
})

app.post("/", function(req, res){
    
})

app.post("/signin", function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    let data = {
        username: username,
        password: password
    }
    let jsonData = JSON.stringify(data);
    let options = {
        hostname: "127.0.0.1",
        port: 8080,
        path: "/api/auth/signin",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let request = http.request(options, (response)=>{
        // console.log('StatusCode: ', response.statusCode);
        if(response.statusCode === 200){
            response.on('data', data => {
               let dataQueue = JSON.parse(data);
               localStorage.setItem('x-token', dataQueue.token);
            })
            res.render("dashboard");
        }
        else{
            res.redirect("/");
        }
    })
    request.on('error', (err)=>{
        console.log(err);
    })
    request.write(jsonData);
    request.end();
})

app.post("/signup", upload.single('driverAvatar'), function(req, res){
    let options = {
        hostname: "127.0.0.1",
        port: 8080,
        path: "/api/auth/signup",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    switch(req.body.selector){
        case "customer":
            console.log("customer");
            break;
        case "driver":
            let driverLastName = req.body.driverLastName;
            let driverFirstName = req.body.driverFirstName;
            let driverAddress = req.body.driverAddress;
            let driverBirthDate = req.body.driverBirthDate;
            let driverPhone = req.body.driverPhone;
            let driverAvatar = req.file;
            let dataDriver = {
                lastName: driverLastName,
                firstName: driverFirstName,
                birthDate: driverBirthDate,
                address: driverAddress,
                phone: driverPhone,
                photo: driverAvatar
            }
            let jsonDataDriver = JSON.stringify(dataDriver);
            let requestDriver = http.request(options, (request, response)=>{
                if(response.statusCode === 200){
                    response.on("data", (data)=>{
                        console.log(JSON.parse(data));
                    })
                }
                else{
                    res.redirect("/");
                }
            })
            requestDriver.on("error", (err)=>{
                console.log(err);
            })
            requestDriver.write(jsonDataDriver);
            requestDriver.end();
            break;
        default:
            let username = req.body.createUsername;
            let email = req.body.createEmail;
            let password = req.body.createPassword;
            let role = req.body.selector;
            let data = {
                username: username,
                email: email,
                password: password,
                roles: [role]
            }
            let jsonData = JSON.stringify(data);
            let request = http.request(options, (response)=>{
                if(response.statusCode === 200){
                    response.on("data", (data)=>{
                        console.log(JSON.parse(data));
                    })
                    res.render("dashboard");
                }
                else{
                    res.redirect("/");
                }
            })
            request.on("error", (err)=>{
                console.log(err);
            })
            request.write(jsonData);
            request.end();
            break;

    }
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

app.post("/customer", function(req, res){
    res.render("customer");
})

app.post("/driver", function(req, res){
    let driverFullName = req.body.driverFullName;
    let driverPhone = req.body.driverPhone;
    let driverAddress = req.body.driverAddress;

    res.render("driver");
})
app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
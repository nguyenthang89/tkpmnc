const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');

<<<<<<< HEAD
const { io } = require("socket.io-client");
const socket = io("http://localhost:8080");

socket.on("found", (args) => {
    console.log(args);
});


=======
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
// Sign In
const signin = (req, res, next)=>{
    res.render("signin.hbs");
}
async function postSignin(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    let dataSignin = JSON.stringify({
        "username": username,
        "password": password
    });
<<<<<<< HEAD
=======

>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
    
    let url = 'http://localhost:8080/api/auth/signin';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataSignin
    }
    fetch(url,options)
    .then((response)=>response.json())
    .then((data)=>{
        if(data.statusCode == 200){
            let role = data.roles[0];
            localStorage.setItem('x-token', data.token);
            localStorage.setItem('id', data.id);
<<<<<<< HEAD
            socket.emit("join", data.id);
            switch(role){
                
                case "ROLE_ADMIN":
                    res.redirect(307, "/admin");
                    break;
                case "ROLE_DRIVER":                   
=======
            
            switch(role){
                case "ROLE_ADMIN":
                    res.redirect(307, "/admin");
                    break;
                case "ROLE_DRIVER":
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
                    res.redirect(307, "/driver");
                    break;
                default:
                    res.redirect("/");
                    break; 
            }
        }
        else{
            res.render("signin", {message: data.message})
        }
        
    })
    .catch((error)=>{
        console.error('Error: ', error);
    })
}
// End Sign In

module.exports = {
    signin,
    postSignin,
}
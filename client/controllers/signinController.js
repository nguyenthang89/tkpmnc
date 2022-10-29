const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');

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
        let role = data.roles[0];
        localStorage.setItem('x-token', data.token);
        localStorage.setItem('id', data.id);
        switch(role){
            case "ROLE_ADMIN":
                res.redirect(307, "/admin");
                break;
            case "ROLE_DRIVER":
                res.redirect(307, "/driver");
                break;
            default:
                res.redirect("/");
                break; 
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
const fetch = require('node-fetch');

const signup = (req, res, next)=>{
    res.render("signup.hbs");
}

const postSignup = (req, res, next)=>{
    let role = req.body.userRoles;
    let registerUsername = req.body.registerUsername;
    let registerEmail = req.body.registerEmail;
    let registerPassword = req.body.registerPassword;
    let jsonDataSignup = JSON.stringify({
        "username": registerUsername,
        "email": registerEmail,
        "password": registerPassword,
        "roles": [role]
    })
    let url = "http://localhost:8080/api/auth/signup";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonDataSignup
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        res.render("signup.hbs", {message: data.message});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    signup,
    postSignup
}
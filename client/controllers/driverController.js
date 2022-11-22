const fetch = require('node-fetch');
require('dotenv').config();
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
let googleApi = process.env.GOOGLE_MAPS_API_KEY;
const dashboard = (req, res, next)=>{
    let data = {
        driverId :localStorage.getItem('id')
    }
    let url = "http://localhost:8080/api/driver/get-info-driver";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-token')
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => 
        res.render("driver/dashboard-driver.hbs", {
            data: data,
            message: "123"
        })
    )
    .catch(error => {
        console.log(error);
    })
}
const updateInfo = (req, res, next)=>{
    res.render("driver/update-info.hbs");
}

const getLatLong = async (req, res, next)=>{
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req}&key=${googleApi}`;
    let responseData = await fetch(url).then(response => response.json());
    return responseData.results[0].geometry.location;
}

const postUpdateInfo = async(req, res, next)=>{
    try{
        let driverId = localStorage.getItem('id');
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let birthDate = req.body.birthDate;
        let address = req.body.address;
        let phone = req.body.phone;
        let photo = "";
        let latLng = await getLatLong(address);
        let dataJson = JSON.stringify({
            driverId: driverId,
            lastName: lastName,
            firstName: firstName,
            birthDate: birthDate,
            address: address,
            phone: phone,
            photo: photo,
            lat: latLng.lat,
            long: latLng.lng
        });
        let url = "http://localhost:8080/api/driver/info-driver-upd";
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('x-token')
            },
            body: dataJson
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('info-driver', dataJson);
            res.render('driver/update-info.hbs', {message: data.message});
        })
        .catch(err => {
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }
    
}


module.exports = {
    dashboard,
    updateInfo,
    postUpdateInfo
}
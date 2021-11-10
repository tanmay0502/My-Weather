const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const path= require("path")
const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


//app.use(express.static("public"));

app.post("/", function(req, res){
    var city= req.body.CityName;
    const url= ("https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&units=Metric&appid=fbbbacb6f5fdb3fc78798f876675efb1");

    https.get(url, function(response){
            console.log(response.statuscode);
            
            response.on("data", function(data){
                const weatherData= JSON.parse(data)
                const temperature= weatherData.main.temp;
                const humidity= weatherData.main.humidity;
                const feel= weatherData.main.feels_like;
                res.write("<h1> Temperature at ur location is " +temperature+ " degree celcius.</h1>");
                res.write("<h1>Humidity: "+humidity+"</h1>");
                res.write("<h1>Feels like: "+feel+" degree celsius.</h1>")
                res.send();
                
            } )
        })
})

app.listen(6969, function(){
    console.log("Started at 6969");
})

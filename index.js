import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const openweatherKey="62fb0753edefa3493431dc7cfa992c7b";

app.get("/",async(req,res)=>{
    const getLocation= await axios.get("http://ip-api.com/json/")
    console.log(getLocation.data.city);
    const city=getLocation.data.city;
    const searchedLocation= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherKey}`);

    

    res.render("index.ejs",{
        city:searchedLocation.data.name,
        country: searchedLocation.data.sys.country,
        expectations:searchedLocation.data.weather[0].main,
        temp:Math.floor((searchedLocation.data.main.temp)-273.15),
        icon:searchedLocation.data.weather[0].icon,
        realTemp:Math.floor((searchedLocation.data.main.feels_like)-273.15),
        wind:searchedLocation.data.wind.speed,
        chancesRain:searchedLocation.data.rain["1h"],
        humidity:searchedLocation.data.main.humidity
    })        
    })

app.post("/search", async(req,res)=>{

    const city=req.body.search;
    console.log(city);

    const searchedLocation= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherKey}`);

    res.render("index.ejs",{
        city:searchedLocation.data.name,
        country: searchedLocation.data.sys.country,
        expectations:searchedLocation.data.weather[0].main,
        temp:Math.floor((searchedLocation.data.main.temp)-273.15),
        icon:searchedLocation.data.weather[0].icon,
        realTemp:Math.floor((searchedLocation.data.main.feels_like)-273.15),
        wind:searchedLocation.data.wind.speed,
        chancesRain:searchedLocation.data.rain["1h"],
        humidity:searchedLocation.data.main.humidity
    })
})


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
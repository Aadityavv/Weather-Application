import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // Make sure your view engine is set to ejs
const openweatherKey = "YOUR API KEY";


app.get("/", async (req, res) => {
    try {
        const getLocation = await axios.get("http://ip-api.com/json/");
        console.log(getLocation.data.city);
        const city = getLocation.data.city;
        const searchedLocation = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherKey}`);

        const sunriseTimestamp = searchedLocation.data.sys.sunrise * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const sunriseStr = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const sunsetTimestamp = searchedLocation.data.sys.sunset * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const sunsetStr = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const weatherMain=searchedLocation.data.weather[0].main;

        let color="";
        console.log(weatherMain);

        if(weatherMain==="Clear"){
             color="rgba(255, 232, 80, 0.3)";
        }
        else if(weatherMain==="Cloudy"){
             color="rgb(131,131,131,0.3);";
        }
        else if(weatherMain==="Rain"){
             color="rgba(117, 182, 217, 0.8)";
        }
        else if(weatherMain==="Drizzle" ||weatherMain==="Fog"||weatherMain==="Mist"){
             color="rgb(172,172,172,0.3);";
        }
        else if(weatherMain==="snow"){
             color="rgb(255,255,255,0.3);";
        }

        res.render("index", {
            city: searchedLocation.data.name,
            country: searchedLocation.data.sys.country,
            expectations: searchedLocation.data.weather[0].main,
            temp: Math.floor(searchedLocation.data.main.temp - 273.15),
            icon: searchedLocation.data.weather[0].icon,
            realTemp: Math.floor(searchedLocation.data.main.feels_like - 273.15),
            wind: searchedLocation.data.wind.speed,
            description: searchedLocation.data.weather[0].description,
            humidity: searchedLocation.data.main.humidity,
            pressure: searchedLocation.data.main.pressure,
            sunrise: sunriseStr,
            sunset: sunsetStr,
            minTemp: Math.floor(searchedLocation.data.main.temp_min-273.15),
            maxTemp: Math.floor(searchedLocation.data.main.temp_max-273.15),
            color:color
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Error fetching weather data");
    }
});

app.post("/search", async (req, res) => {
    try {
        const city = req.body.search;
        console.log(city);

        const searchedLocation = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherKey}`);

        const sunriseTimestamp = searchedLocation.data.sys.sunrise * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const sunriseStr = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const sunsetTimestamp = searchedLocation.data.sys.sunset * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const sunsetStr = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const weatherMain=searchedLocation.data.weather[0].main;
        let color="";
        console.log(weatherMain);

        if(weatherMain==="Clear"){
            color="rgba(52, 152, 253, 0.3)";
       }
       else if(weatherMain==="Cloudy"){
            color="rgba(131,131,131,0.3)";
       }
       else if(weatherMain==="Rain"){
            color="rgba(117, 182, 217, 0.8)";
       }
       else if(weatherMain==="Drizzle" ||weatherMain==="Fog"||weatherMain==="Mist"){
            color="rgba(172,172,172,0.3)";
       }
       else if(weatherMain==="snow"){
            color="rgba(255,255,255,0.3)";
       }


        res.render("index", {
            city: searchedLocation.data.name,
            country: searchedLocation.data.sys.country,
            expectations: searchedLocation.data.weather[0].main,
            temp: Math.floor(searchedLocation.data.main.temp - 273.15),
            icon: searchedLocation.data.weather[0].icon,
            realTemp: Math.floor(searchedLocation.data.main.feels_like - 273.15),
            wind: searchedLocation.data.wind.speed,
            description: searchedLocation.data.weather[0].description,
            humidity: searchedLocation.data.main.humidity,
            pressure: searchedLocation.data.main.pressure,
            sunrise: sunriseStr,
            sunset: sunsetStr,
            minTemp: Math.floor(searchedLocation.data.main.temp_min-273.15),
            maxTemp: Math.floor(searchedLocation.data.main.temp_max-273.15),
            color:color
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // Make sure your view engine is set to ejs
const openweatherKey = "62fb0753edefa3493431dc7cfa992c7b";

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
            latitude: searchedLocation.data.coord.lat,
            longitude: searchedLocation.data.coord.lon
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
            latitude: searchedLocation.data.coord.lat,
            longitude: searchedLocation.data.coord.lon
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

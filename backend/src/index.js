const express = require('express');
const fetch = require('cross-fetch');
const app = express();
const port = 3000;
const cors = require('cors');

/**
 * OpenWeather API:
 * https://openweathermap.org/current#geo
 */
const OPENWEATHER_API_KEY='0f74748762ca5c30c946863d0cd83b4b';

app.use(cors());
app.get('/', async(req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPENWEATHER_API_KEY}`);
  if(response.status >= 400) {
      throw new Error("Error occurred");
  }
  const json = await response.json();
  const weather = json.weather;

  if(weather.length === 0) {
    throw new Error("Error occurred")
  }
  res.send(weather[0]);
});
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});

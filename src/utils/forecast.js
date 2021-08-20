const request = require('request');

const forecast = ({ lat, long }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=52faf386224eec9795f6d6c2385f771c&query=${lat},${long}`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            return callback('Unable to connect to weather service!',undefined);
        }
        else if (res.body.success !== undefined) {
            return callback('Unable to find location!',undefined);
        }
        callback(undefined, `${res.body.current.weather_descriptions}. It is cureently ${res.body.current.temperature} degrees out. It feels like ${res.body.current.feelslike} degrees out`);
    })
}
module.exports = forecast;
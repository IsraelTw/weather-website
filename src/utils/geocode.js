const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicG9sbzEyIiwiYSI6ImNrc2VzM2p5YTEzbXkydHFrY3luOWVzZnEifQ.KafwQYLZnxd2clBHMEWzBw&limit=1`;
    request({ url, json: true }, (err, res) => {
        // return console.log(err, res.body) 
        if (err) {
            return callback('Unable to conncet to location services', undefined);
        }
        else if (res.body.query.length===0) {
            return callback({error:'Unable to find location, Try another search!'}, undefined);
        }            
        const data = { 
            location: res.body.features[0].place_name,
            lat: res.body.features[0].center[1], 
            long: res.body.features[0].center[0]
        }
        callback(undefined, data);
    })
}
module.exports = geocode;
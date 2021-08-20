const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const viewsPath = path.join(__dirname, '../temlates/views');
const partialsPath = path.join(__dirname, '../temlates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Israel Twito'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Israel Twito'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Israel Twito'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Address most be provided' })
    }
    geocode(req.query.address, (error, data) => {
        console.log(error, data)
        if (error) {
            return res.send(error);
        }
        forecast(data, (error, forecastData) => {
            console.log(error, forecastData)
            if (error) {
                return res.send(error);
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });
        });
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Israel Twito',
        Error: 'Help artical not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Israel Twito',
        Error: 'Page not Found'
    })
});

app.listen(process.env.PORT || '3000', () => {
    console.log('app lisen on port 3000');
});
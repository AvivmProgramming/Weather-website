const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()



// Define Paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aviv Mark'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aviv mark'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Do you need any kind of help?',
        title: 'Help',
        name: 'Aviv mark'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: ' You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        error:'Help article not found',
        title: '404 Error',
        name: 'Aviv mark'
    })
})

app.get('*' ,(req,res) => {
    res.render('404',{
        error: 'Page not found',
        title: '404 Error',
        name: 'Aviv mark'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
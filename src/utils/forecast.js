const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6a663ecca352e601ef9de89fd4958335&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and ' + body.current.humidity + '% humidity. It feels like ' + body.current.feelslike + ' degrees',
                forecastImgSrc: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast
const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/63c9f3994691364d77bf5611d9c0e832/' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'?units=si&lang=es'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('No es posible conectarse al servicio del pronostico del clima', undefined)
        } else if (body.error) {
            callback('No fue posible encontrar esta ubicación', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary 
            + ' La temperatura actual es ' 
            + body.currently.temperature 
            + ' grados. Hay '
            + body.currently.precipProbability 
            + '% de probabilidad de lluvia.')
        }
    })
}

module.exports = forecast
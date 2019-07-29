const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFiaWFucGluMSIsImEiOiJjanlmdnh0Nm8xZ282M2NwYnhqNzNmbmxoIn0.LrCLL1RQlob0uY2psrKYrQ&limit=1&language=es'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Error, no es posible conetarse al servicio de geolocalización', undefined)
        } else if (body.features.length === 0) {
            callback('No se puede encontrar esa ubicación. Intenta otra busqueda diferente', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
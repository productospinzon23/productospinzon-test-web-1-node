const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//Define paths for express config
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Diana Pinzon - Whatsapp: 314-2884815',
        name: 'Productos Pinzon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Historia de ProductosPinzon',
        name: 'Creada por Fabian Pinzón'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Cualquier pregunta que tengas con gusto te responderemos',
        title: 'Página de ayuda',
        name: 'Fabian Pinzón'
    })
})

app.get('/weatherJson', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Es necesario que escribas el nombre de una ciudad'
        }) 
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send(error)
            }
            res.send({location, forecastData})
        })
    })
})

app.get('/weather', (req, res) => {
    res.render('weather')
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Tu busqueda no produjo resultados'
        })
    }

    console.log(req.query)
    res.render('products', {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Página de ayuda no encontrada'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Esta Página web no fue encontrada'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
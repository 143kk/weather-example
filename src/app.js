const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory)) //使用relative path是相对node运行的目录

app.get('', (req, res) => {
    res.render('index', {
        title: 'Good Day!',
        name: 'kingsb'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Too tired',
        title: 'Help',
        name: 'Arv'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    const address = req.query.address

    geocode(address, (error, {longtitude, latitude, location} = {}) => {
        if(error) {
            return res.send( {error} )
        }
    
        forecast(longtitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send( {error} )
            }

            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search item'
        })
    }
    console.log(req.query)
    res.send()
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 404,
        name: 'System',
        err: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'System',
        err: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
const request = require("postman-request");

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=250bb7c587dc9b49cf5d7ee7cb8c52b2&' + 
                `query=${latitude},${longtitude}`
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather service!")
        }else if (body.error) {
            callback("Unable to find the location!") 
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. ' + 
                    "It's " + body.current.temperature + 
                    " degrees. It feels like " + 
                    body.current.feelslike + ' degrees. ' + 
                    'Humidity: ' + body.current.humidity
            );
        }
    })
}

module.exports = forecast
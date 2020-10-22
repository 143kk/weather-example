const request = require('postman-request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
                encodeURIComponent(address) + 
                ".json?limit=1&access_token=pk.eyJ1IjoiMTQza2siLCJhIjoiY2tnYXVsNzlnMDZzbTJxbWNlbTJsYjVnYyJ9.xu79w6U6B2teL176tdJI1A";

    request({json: true, url}, (error, {body} = {}) => {
        if(error) {
            callback("Unable to connect to location services")
        } else if(!body.features.length) {
            callback("Unable to find the location, please try again with other words!")
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
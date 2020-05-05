const request = require('request') 

const geocode = (address,callback)=>{
    url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaXZhbjI0IiwiYSI6ImNrOXA2bWRqZDA3djczcHJyaGF4MDBzNzkifQ.ZoBvNKNkCyLhK2U6VtHFnQ&limit=1"
    
    request({url,json:true},(error,response)=>{
        if(error)
            callback("Unable to connect!",undefined)
        else if(response.body.features.length==0)
             callback("Invalid input",undefined)   
        else
            callback(undefined,{
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                loc:response.body.features[0].place_name
            })    

    })
}

module.exports = geocode
const request = require('request') 

const weather =(lat,lon,callback)=>{

    url ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=01c8d4b5683360ef938a165912ccbc45"
    
    request({url,json:true},(error,response)=>{
        if(error)
            callback("Unable to connect!",undefined)
        else if(response.body.error)
            callback("Invalid input",undefined)   
        else
            callback(undefined,{
                temp:response.body.current.temp,
                weather:response.body.current.weather[0].main,
                icons:response.body.current.weather[0].icon,
                wind:response.body.current.wind_speed,
                humidity:response.body.current.humidity
            })    
    
    })
    
    }

module.exports = weather
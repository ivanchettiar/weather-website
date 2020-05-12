const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode =require('./utils/geolocation')
const weather =require('./utils/weather')

const HomePagePath = path.join(__dirname,'../public')
const PartialsPath = path.join(__dirname,'/views/partials')
const ViewsPath = path.join(__dirname,'/views/pages')

const app = express()

const port_no = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',ViewsPath)
app.use(express.static(HomePagePath))

hbs.registerPartials(PartialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        activeA : 'active'
    }
    )

})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
    return res.send({
        error:'Please Enter a location!'
    })
}
geocode(req.query.location,(error,{lat,lon,loc}={})=>{
    if (error)
    return res.send({
         error
     })
    weather(lat,lon,(error,data1)=>{
        if(error)
        return res.send({
            error
        })
        
        res.send({
            loc,
            temp:data1.temp,
            windSpeed:data1.wind,
            icon:data1.icons,
           summary:data1.weather,
            humidity:data1.humidity
        })
    
    })

})
}
)

app.get('/about',(req,res)=>{
    res.render('about',{
        activeB:'active'
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port_no,()=>{
    console.log('Server running on port '+ port_no)
})
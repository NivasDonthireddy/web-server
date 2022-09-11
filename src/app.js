const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config.
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views location.
app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(path.join(__dirname,'../public')));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Nivas'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name :'Nivas'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This  is a help page',
        title:'help page',
        name :'Nivas'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            err: 'You must provide an address'
        })
    }
    geoCode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({err});
        }
        forecast(latitude,longitude,(err,resp)=>{
            if(err){
                return res.send({err});
            }
            return res.send({
                forecast: resp,
                location,
                address: req.query.address
            })
        })
    })

});


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article  not found'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found.'
    });
});

app.listen(3000,()=>{
    console.log('server is up on port 3000');
});

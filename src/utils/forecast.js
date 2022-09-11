const request =  require('request');

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ccacfbe9ccab701b5a005a57af3c405a&query=${latitude}+${longitude}`;
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('unable to connect to the service');
        } else if(body.error){
            callback('unable to find the location');
        } else {
            const data = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out.There is a ${body.current.precip}% chance of rain.The Humidity is ${body.current.humidity}`;
            callback(undefined,data);
        }
    })
}

module.exports = forecast;
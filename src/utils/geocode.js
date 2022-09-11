const request = require('request');
const geoCode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoibml2YXNkb250aGlyZWRkeSIsImEiOiJjbDdveGY2aGwxcWJnM3ZxenZ5MjlmamlmIn0.FiS-LLvFVi57GuamBfRtNQ`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the service')
        } else if(body.features.length===0){
            callback('unable to find location');
        } else {
            const longitude = body?.features[0].center[0];
            const latitude = body?.features[0].center[1];
            const location = body?.features[0].place_name;
            callback(undefined,{longitude,latitude,location});
        }
    })
}

module.exports = geoCode;
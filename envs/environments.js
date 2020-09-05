const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./bot.properties');

//let getProperty = (pty) => { return prop.get(pty); }

let getProperty = function(pty){
    return prop.get(pty);
}

module.exports = getProperty
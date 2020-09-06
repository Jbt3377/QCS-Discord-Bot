const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./bot.properties');

let getProperty = function(pty){
    return prop.get(pty);
}

module.exports = getProperty
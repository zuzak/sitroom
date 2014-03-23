/**
 * Configures the per-install configuration.
 *
 * You should not edit these default configuration settings: create
 * ../config.json instead, or use environment variables.
 */

var convict = require('convict')

var conf = convict({
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  imgurid: {
    doc: 'Imgur client ID',
    format: String,
    default: "xxxxxxxxxxxxxxx",
    env: "IMGUR_ID"
  },
  imgursecret: {
    doc: 'Imgur client secret from https://api.imgur.com/oauth2/addclient',
    format: String,
    default: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    env: "IMGUR_SECRET"
  }
})

try {
  conf.loadFile(__dirname + '/config.json')
  console.log('Loaded configuration file.')
} catch (e) {
  console.log('Unable to load config.json')
}

module.exports = conf

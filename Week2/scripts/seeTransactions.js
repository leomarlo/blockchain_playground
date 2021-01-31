import client from "./client.js"
import config from "./config.js"

client.request('sendDB',[], function(err, response) {
    if(err) throw err;
    console.log(response.result);
})
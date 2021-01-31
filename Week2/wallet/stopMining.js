import client from "./client.js"

client.request('stopMining',[], function(err, response) {
    if(err) throw err;
    console.log(response.result);
})
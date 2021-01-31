import client from "./client.js"

client.request('startMining',[], function(err, response) {
    if(err) throw err;
    console.log(response.result);
})
import global from "../global.js" 
import jayson from "jayson"

console.log(global.ADDRESS_TO_PORT)
const nodes = Object.keys(global.ADDRESS_TO_PORT)

for (let i = 0; i<nodes.length; i++){
    console.log(global.ADDRESS_TO_PORT[nodes[i]])
    const client = jayson.client.http({
        port: global.ADDRESS_TO_PORT[nodes[i]]
    });
    client.request('sendDB',[], function(err, response) {
        if(err) throw err;
        console.log(response.result);
    })
}


// export default client;
import config from "../config.js" 
import jayson from "jayson"

const client = jayson.client.http({
    port: config.PORT
});

export default client;


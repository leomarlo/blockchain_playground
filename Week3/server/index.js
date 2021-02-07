import ethers from "ethers";
import {YOUR_INFURA_PROJECT_ID} from "./config.js"

// Use the mainnet
const network = "homestead";


// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider(network, {
    // etherscan: YOUR_ETHERSCAN_API_KEY,
    infura: YOUR_INFURA_PROJECT_ID,
    // Or if using a project secret:
    // infura: {
    //   projectId: YOUR_INFURA_PROJECT_ID,
    //   projectSecret: YOUR_INFURA_PROJECT_SECRET,
    // },
    // alchemy: YOUR_ALCHEMY_API_KEY,
    // pocket: YOUR_POCKET_APPLICATION_KEY
    // Or if using an application secret key:
    // pocket: {
    //   applicationId: ,
    //   applicationSecretKey:
    // }
});
// connect to some provider 
let resp = null 
await provider.getBlock(100004).then(dat => {console.log(dat); resp = parseInt(dat.nonce,16)})
// // console.log(provider.getBlock())
console.log(resp)
console.log("hallo")

const server = jayson.server({
    newdata: function(_, callback) {
        startMining();
        callback(null, 'success!')
    }
})


server.http().listen(config.PORT)
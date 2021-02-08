import ethers from "ethers";
import jayson from "jayson";
import {YOUR_INFURA_PROJECT_ID} from "./config.js"

// Use the mainnet
const network = "homestead";
const PORT = 3022;

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
async function getTransactionValueOfLastBlock(){
    let blockn = null
    let latestblock = null 
    let tx = null
    await provider.getBlockNumber().then(function(blockNumber) {
        blockn = blockNumber
    }).catch(console.log);
    await provider.getBlock(blockn).then(dat => {latestblock = dat}).catch(console.log)
    // // console.log(provider.getBlock())
    await provider.getTransaction(latestblock.transactions[0]).then(function(transactionReceipt) {
        console.log(transactionReceipt);
        tx = transactionReceipt
    }).catch(console.log);

    return tx ? parseInt(tx.value.toString(),10) * (10 ** (-18)): "not available"
}

// console.log(blockn)

const server = jayson.server({
    newdata: function(_, callback) {
        // startMining();
        callback(null, 'success!')
    }
})

async function looping() {
    const result = await getTransactionValueOfLastBlock()
    console.log(result);
    setTimeout(looping,  5* 60 * 1000)
}

looping()

server.http().listen(PORT)
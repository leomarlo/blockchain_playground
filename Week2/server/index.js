// import db from "./db.js"
import {startMining, stopMining} from "./mine.js"
import getBalance from "./balance.js"
import jayson from "jayson"
import config from "../config.js"
// import {Block} from "./block.js"

const server = jayson.server({
    startMining: function(_, callback) {
        startMining();
        callback(null, 'success!')
    },
    stopMining: function(_, callback) {
        stopMining();
        callback(null, 'success!')
    },
    getBalance: function(addresses, callback) {
        const balance = getBalance(addresses[0]);
        console.log(balance)
        callback(null, balance)
    }
})

server.http().listen(config.PORT)

// db.blockchain.addTransactions()
// // db.blockchain.mine()
// setTimeout(mine,1400)
// console.log('hallo')
// console.log(bc.blocks)
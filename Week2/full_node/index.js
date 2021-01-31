// import db from "./db.js"
// import {startMining, stopMining} from "./mine.js"
import getBalance from "./balance.js"
import jayson from "jayson"
import config from "./config.js"
import yargs from "yargs"
import User from "./user/user.js"
import global from "../global.js"
const {bla} = yargs.argv
// import {Block} from "./block.js"
console.log(bla)
let PORT = 3010;
const satoshi = new User(PORT);
satoshi.startServer()
console.log('---> server started')
satoshi.eswerdelicht()
console.log('---> genesis mined')
satoshi.startNewPeersBot()
console.log('---> search for new peers')
satoshi.startNewDBBot()
console.log('---> search for DBs')
// satoshi.startTxBot()
console.log('---> start making transactions')
console.log(`the key of satoshi is ${satoshi.publicKey}`)
PORT++;
const leo = new User(PORT);
console.log(`the key of leo is ${leo.publicKey}`)
console.log('---> new server started')
leo.startServer();
console.log('---> new server searches for new peers')
leo.startNewPeersBot()
console.log('---> new server searches for new DBs')
leo.startNewDBBot()
console.log('---> new server starts sending transactions')
// satoshi.startTxBot()
// leo.db

console.log(global)


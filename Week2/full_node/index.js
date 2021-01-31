// import db from "./db.js"
import {startMining, stopMining} from "./mine.js"
import getBalance from "./balance.js"
import jayson from "jayson"
import config from "./config.js"
import yargs from "yargs"
import User from "./user/user.js"
import global from "../global.js"
const {bla} = yargs.argv
// import {Block} from "./block.js"

let PORT = 3010;
const santoshy = new User(PORT);
santoshy.writeStuffToDB({message: 'Hi this is me, Santoshi!'})
santoshy.startServer()
PORT++;
const leo = new User(PORT);
leo.startServer();
leo.addAllNewPeers();
leo.demandDB(santoshy.publicKey)
leo.db

console.log(global)


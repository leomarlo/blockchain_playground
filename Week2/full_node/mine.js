import db from "./db.js"
import Block from "./models/block.js"
import config from "./config.js"
import sha256 from 'crypto-js/sha256.js'
import TXO from "./models/txo.js"
import Transaction from "./models/transaction.js"

let mining = false

function startMining(){
    mining = true;
    mine()
}

function stopMining(){
    mining = false
}


function mine(){
    if (!mining) {return}

    
    const block = new Block()
    block.id = db.blockchain.BlockHeight()
    const coinbaseutxo = new TXO(config.PUBLIC, db.BLOCKREWARD)
    const utxo = new Transaction([], [coinbaseutxo])

    block.addTransaction(utxo)
    // get transactions from mempool 
    // const transactions = [];
    // for (let i = 0; i<db.blockchain.mempool.length; i++){
    //     block.addTransaction(db.blockchain.mempool.pop())
    // }
    // block.addTransactions() = transactions
    while(BigInt("0x" + block.hash()) >= BigInt(db.TARGET_DIFFICULTY)){
        block.nonce++;
    }

    block.execute()
    
    db.blockchain.addBlock(block)
    const message = `Mined block number ${block.id} with hash ${block.hash()}`;

    // coinbaseutxo.spend()
    console.log(message)
    // console.log(db.blockchain[db.blockchain.length-1].hash())
    setTimeout(mine, 4000)
}

export {startMining, stopMining};
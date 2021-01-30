import {Block} from "./block.js";
import elliptic from 'elliptic';
import crypto from 'crypto-js';

const EC = elliptic.ec;
const SHA256 = crypto.sha256;
const ec = new EC('secp256k1');

const PEOPLE = ["Dan", "Daelyn", "Demi", "Mike", "Leo", "Lord Voldemort"]
const VALUES = ["1BTC", "5BTC", "10BTC", "20BTC", "100BTC", "200BTC"]


class Blockchain {
    constructor(){
        const genesis = new Block(0)
        // const genesis = {id: 0}
        this.blocks = [genesis];
        this.mempool = []; 
        // cannot call methods from within the class, because the class has not been read yet.
    }

    addBlock(block){
        this.blocks.push(block)
    }

    BlockHeight(block){
        return this.blocks.length
    }

    mine(){
        const transactions = [];
        for (let i = 0; i<this.mempool.length; i++){
            transactions.push(this.mempool.pop())
        }
        const id = this.blocks.length
        const block = new Block(id)
        // const block = {id: id}
        block.transactions = transactions
        this.addBlock(block)

        const message = `Mined block number ${id}`;
        console.log(message)
        console.log(block)
        setTimeout(()=>this.mine(), 5000)
    }

    addTransaction(transaction){
        this.mempool.push(transaction)
    }

    addTransactions(){
        const from_ind = Math.floor(Math.random() * PEOPLE.length);
        const to_ind = Math.floor(Math.random() * PEOPLE.length);
        const value_ind = Math.floor(Math.random() * VALUES.length);
        const newtx = {'from': PEOPLE[from_ind], 'to': PEOPLE[to_ind], "value": VALUES[value_ind]}
        this.addTransaction(newtx)
        setTimeout(()=> this.addTransactions(), 1201)
    }

    
}

export default Blockchain;

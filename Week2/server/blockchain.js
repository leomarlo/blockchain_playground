import {Block} from "./block.js";
import elliptic from 'elliptic';
import crypto from 'crypto-js';

const EC = elliptic.ec;
const SHA256 = crypto.sha256;
const ec = new EC('secp256k1');


class blockchain {
    constructor(genesis){
        this.blocks = [genesis];
        this.mempool = [];
    }

    addBlock(block){
        this.blocks.push(block)
    }

    mine(){}

    
}

const bc = new blockchain(4);
console.log(bc.blocks)
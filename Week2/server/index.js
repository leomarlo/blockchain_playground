import Blockchain from "./blockchain.js"
import {Block} from "./block.js"


const BC = new Blockchain();
BC.addTransactions()
BC.mine()
console.log('hallo')
// console.log(bc.blocks)
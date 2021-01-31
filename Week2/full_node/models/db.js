import Blockchain from './blockchain.js'

class DB {
    constructor(){
        this.blockchain = new Blockchain();
        this.utxos = [];
    }
}

export default db;
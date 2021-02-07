import sha256 from "crypto-js/sha256.js";

class Block {
    constructor(){
        this.id = 0;
        this.timstamp = Date.now();
        this.nonce = 0;
        this.transactions = [];
        this.prevHash = null;
    }

    addTransaction(tx){
        this.transactions.push(tx)
    }

    hash() {
        const block_info = {
            id: this.id,
            timestamp: this.timestamp,
            nonce: this.nonce,
            prevHash: this.prevHash,
            transactions: this.transactions
        }
        return sha256(JSON.stringify(block_info)).toString()
    }

    execute() {
        this.transactions.forEach(tx => tx.execute());
    }
}

export default Block;
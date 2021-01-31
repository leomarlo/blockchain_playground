import Blockchain from "./models/blockchain.js"
// screenTop

const db = {
    blockchain: new Blockchain(),
    utxos: [],
}

export default db;
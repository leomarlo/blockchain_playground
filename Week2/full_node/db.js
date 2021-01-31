import Blockchain from "./models/blockchain.js"
// screenTop


const db = {
    blockchain: new Blockchain(),
    utxos: [],
    TARGET_DIFFICULTY: "0x00" + "F".repeat(62),
    CURRENCY: "LEO",
    BLOCKREWARD: 1,
}

export default db;
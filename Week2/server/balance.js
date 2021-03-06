import config from "../config.js";
import db from "./db.js"

function getBalance(address) {
    const ourUTXOS = db.utxos.filter(tx=>{
        return tx.owner === address && (!tx.spent);
    })
    const sum = ourUTXOS.reduce((a,c)=> {return a + c.amount}, 0);
    return sum + " " + config.CURRENCY;
}

export default getBalance;
import db from "../db.js"

class Transaction {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs; 
    }
    execute() {
        this.inputs.forEach((input)=>{input.spend()})
        this.outputs.forEach((output)=>{
            db.utxos.push(output)
        });
    }
}

export default Transaction;
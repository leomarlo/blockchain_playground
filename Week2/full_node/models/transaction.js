import db from "./db.js"

class Transaction {
    constructor(inputs, outputs, fee) {
        this.inputs = inputs;
        this.outputs = outputs; 
        this.fee = 0;
    }
    execute() {
        this.inputs.forEach((input)=>{input.spend()})
        this.outputs.forEach((output)=>{
            db.utxos.push(output)
        });
    }
}

export default Transaction;
import global from "../../global.js"
import elliptic from 'elliptic';
import jayson from "jayson";
const ec = new elliptic.ec('secp256k1');
import DB from "../models/db.js"
import TXO from "../models/txo.js"
import Transaction from "../models/transaction.js"

class User {

    constructor(port) {
        this.port = port;
        // personal copy of the database
        this.db = DB();
        // personal copy of utxos
        this.my_utxos = [];
        this.my_funds = 0;
        // disable the transaction bot initially
        this.txBotDisabled = true;
        this.newNodesBotDisabled = false;
        this.getNewDBBotDisabled = false;
        // generate private and public keys
        const key = ec.genKeyPair();
        this.privateKey = key.getPrivate().toString(16);
        this.publicKey = key.getPublic().encode('hex');
        // server-client
        this.server = null
        this.channels = {}  // communication channels for this user
        // add this users address to the pool of addresses whose values are the ports that they can be contacted at
        global.ADDRESS_TO_PORT[this.publicKey] = this.port
    }

    get_db(){
        return this.db; // could also be retrieved from a file
    }

    startServer(){
        const self = this // WHYY???? Sometimes this wont work Arrrghgh
        this.server = jayson.server({
            sendDB: function([address], callback) {
                console.log(self.db)
                callback(null, db_obj)
            }
        })
        
        this.server.http().listen(this.port)
    }

    addPeer(address){
        // get port from address
        const new_port = global.ADDRESS_TO_PORT[address]
        const client = jayson.client.http({
            port: new_port
        });
        this.channels[address] = client  // key is a string
    }

    addAllNewPeers(){
        console.log(global.ADDRESS_TO_PORT)
        for (const [address, port] of Object.entries(global.ADDRESS_TO_PORT)) {
            if (this.channels[address]){continue}
            if (this.port === address){continue}
            console.log(`The address is ${address}. The port is ${port}`)
            this.addPeer(address)
        }
    }

    stopNewPeersBot(){this.newNodesBotDisabled = true}
    startNewPeersBot(){
        this.newNodesBotDisabled = false;
        this.addNewPeersBot()
    }
    addNewPeersBot(){
        if (this.newNodesBotDisabled){return}
        this.addAllNewPeers()
        setTimeout(()=>this.addNewPeersBot(),5000)
    }

    // pull the database from the other full_nodes
    demandDB(address){
        const self = this;
        console.log(this.channels)
        const client = this.channels[address]
        client.request('sendDB',[this.publicKey], function(err, response) {
            if(err) throw err;
            if (response.result) {
                // persist it to a file or just load it into RAM
                // or just update the db. here we replace it completely
                return response.result;
            } 
            else {
                console.log('I do not have the data')
                return null
            }
        })
    }

    isLegidBlockchain(test_db){
        // should be validated for internal consistency
        return true;
    }
    updateDbFrom(new_db) {
        // check whether there are new blocks or new transactions
        if (new_db.blockchain.length > this.db.blockchain.length){
            // probably its just one block up.
            for (let j=0; j<this.db.blockchain.length; j++){
                if (this.db.blockchain[j].hash() != new_db.blockchain[j].hash()){
                    // either I am on an orphant branch or this guy is
                    // in this case stick to my version
                    return this.db
                }
            }
            // get all the transactions in the blocks ahead (could be more than one)
            for (let k=this.db.blockchain.length; k<new_db.blockchain.length;k++){
                const block = new_db.blockchain[k];
                for (let m=0; m<block.transactions; m++){
                    const [flag, index] = this.txIsInMempool(block.transactions[m])
                    if (flag){
                        this.db.blockchain.mempool.splice(index,1)
                    }
                }
            }
            this.db.blockchain.chains = new_db.blockchain.chains
        }
        // update mempool nevertheless
        for (let jj = 0; jj<new_db.blockchain.mempool.length; jj++){
            const [flag, _] = this.txIsInMempool(new_db.blockchain.mempool[jj])
            if (!flag){this.db.blockchain.mempool.push(new_db.blockchain.mempool[jj])}
        }
    }

    getNewDBBot() {
        if (this.getNewDBBotDisabled){return}
        // go through all nodes that you know, ask them for the db and check if there's anything new
        const peers = Object.keys(global.ADDRESS_TO_PORT)
        for (let i=0; i<peers.length; i++){
            if (this.publicKey === peers[i]) {continue}
                const new_db = this.demandDB(peers[i])
                if (!this.isMaterialForUpdating(new_db, this.db)){
                    // check if the new db is legit
                    if (!this.isLegidBlockchain(new_db)){continue}
                    this.updateDbFrom(new_db)
                }
        }
    }


    sendTransaction(recipient, amount){
        // create UTXOs from amount
        let sum = 0;
        const inputs = [];
        const outputs = [];
        for (let i=0; this.my_utxos.length; i++){
            sum += this.my_utxos[i].amount
            inputs.push(this.my_utxos);
            if (sum >= amount) {break}
        }
        const surplus = sum - amount;
        if (surplus < 0){
            throw new Error('insufficient funds!')
        }
        outputs.push(TXO(recipient, amount))
        // okay, maybe a little fee, if funds provide for it.
        const fee_applies = surplus>global.MAX_TX_FEE;
        let fee = (fee_applies? global.MAX_TX_FEE : 0);
        let tx_amount = (fee_applies? surplus - fee : surplus)
        outputs.push(TXO(this.publicKey, tx_amount)) 
        this.db.blockchain.mempool.push(Transaction(inputs,outputs, fee))

        // create input and output UTXOs
        
        return sum
    }

    get_myfunds(){
        let sum = 0;
        for (let i=0; this.my_utxos.length; i++){
            sum += this.my_utxos[i].amount
        }
        return sum
    }

    stopTxBot(){this.txBotDisabled = true}
    startTxBot(){
        this.txBotDisabled = false;
        this.transactionBot()
    }
    transactionBot(){
        if (this.txBotDisabled){return}
        this.sendRandomTransaction()
        setTimeout(()=>this.transactionBot(),200)
    }
    
    txIsInMempool(tx){
        let index = null
        for (let i=0; i<this.db.blockchain.mempool.length; i++){
            const mempool_tx = this.db.blockchain.mempool[i]
            if (mempool_tx.inputs == tx.inputs && mempool_tx.outputs == tx.outputs && mempool_tx.fee == tx.fee){
                index = i;
                return [true, index]
            }
        }
        return [false, index]
    }

    sendRandomTransaction(){
        const recipients = Object.keys(global.ADDRESS_TO_PORT)
        let recipient = this.publicKey
        while (recipient === this.publicKey) {
            const chosen_index = Math.floor(recipients.length * Math.random());
            recipient = recipients[chosen_index]
        }
        const amount = Math.floor( 5 * Math.random())
        if (this.get_myfunds() >= amount){
            this.sendTransaction(recipient, amount)
        }


    }
    // verify that its correct

    // persist it locally

    // send transactions once in a while

    // mine once in a while

    // broadcast to the network when a new block has been mined
}

export default User;

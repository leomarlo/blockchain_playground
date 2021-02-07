
class TXO{
    constructor(owner, amount){
        this.owner = owner,
        this.amount = amount,
        this.spent = false;
    }

    spend() {
        this.spent = true;
    }

    rollback() {
        this.spent = false;
    }
}

export default TXO;
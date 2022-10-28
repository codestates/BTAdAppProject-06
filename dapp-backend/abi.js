module.exports = [{
    "anonymous": false, "inputs": [{
        "indexed": false, "internalType": "string", "name": "paymentId", "type": "string"
    }, {
        "indexed": false, "internalType": "address", "name": "owner", "type": "address"
    }, {
        "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"
    }, {
        "indexed": false, "internalType": "uint256", "name": "deadline", "type": "uint256"
    }], "name": "CreatePayment", "type": "event"
}, {
    "anonymous": false, "inputs": [{
        "indexed": false, "internalType": "string", "name": "paymentId", "type": "string"
    }, {
        "indexed": false, "internalType": "address", "name": "owner", "type": "address"
    }, {
        "indexed": false, "internalType": "address", "name": "payer", "type": "address"
    }, {
        "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"
    }, {
        "indexed": false, "internalType": "uint256", "name": "deadline", "type": "uint256"
    }], "name": "MakePayment", "type": "event"
}, {
    "inputs": [{
        "internalType": "string", "name": "paymentId", "type": "string"
    }, {
        "internalType": "uint256", "name": "amount", "type": "uint256"
    }], "name": "createPayment", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{
        "internalType": "string", "name": "paymentId", "type": "string"
    }], "name": "paymentStatus", "outputs": [{
        "internalType": "enum Pay.TransactionStatus", "name": "", "type": "uint8"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [{
        "internalType": "string", "name": "paymentId", "type": "string"
    }], "name": "makePayment", "outputs": [], "stateMutability": "payable", "type": "function"
}]

require('dotenv').config();
const Web3 = require('web3');
const mongoose = require('mongoose')
const PayABI = require('./abi')
const Payment = require('./models/payment');

const {MONGO_URI, BAOBAB_WS_ENDPOINT, CONTRACT_ADDRESS} = process.env;
const options = {
    timeout: 30000, // ms

    clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: -1 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 1000, // ms
        maxAttempts: 10,
        onTimeout: false
    }
};
const provider = new Web3.providers.WebsocketProvider(BAOBAB_WS_ENDPOINT, options)
const web3 = new Web3(provider)


const contract = new web3.eth.Contract(PayABI, CONTRACT_ADDRESS)
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        let dataset = await Payment.findOne({}).sort("-createdBlockNumber").select("createdBlockNumber").exec()
        let latestBlockNumber;
        if (dataset == null)
            latestBlockNumber = undefined
        else
            latestBlockNumber = dataset.createdBlockNumber

        contract.events.CreatePayment({
            fromBlock: latestBlockNumber
        })
            .on("connected", function (subscriptionId) {
                console.log(subscriptionId);
            })
            .on('data', async function (event) {
                console.log(`create payment ${event.returnValues.paymentId}`)
                await Payment.updateByPaymentId(event.returnValues.paymentId, {
                    paymentId: event.returnValues.paymentId,
                    owner: event.returnValues.owner,
                    amount: event.returnValues.amount,
                    deadline: event.returnValues.deadline,
                    createdBlockNumber: event.blockNumber,
                    creationTxHash: event.transactionHash,
                })
            })

        contract.events.MakePayment({
            fromBlock: latestBlockNumber
        })
            .on("connected", function (subscriptionId) {
                console.log(subscriptionId);
            })
            .on('data', async function (event) {
                console.log(`make payment ${event.returnValues.paymentId}`)
                await Payment.updateByPaymentId(event.returnValues.paymentId, {
                    payer: event.returnValues.payer,
                    executedBlockNumber: event.blockNumber,
                    executionTxHash: event.transactionHash
                })
            })
    })
    .catch(e => console.error(e));
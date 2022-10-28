const mongoose = require('mongoose');

// Define Schemes
const paymentSchema = new mongoose.Schema({
        paymentId: {type: String, required: true, unique: true},
        owner: {type: String, required: true},
        payer: {type: String},
        amount: {type: String, require: true},
        deadline: {type: Number, require: true},
        createdBlockNumber: {type: Number, require: true},
        executedBlockNumber: {type: Number},
        creationTxHash: {type: String, require: true},
        executionTxHash: {type: String}
    },
    {
        timestamps: true
    });

paymentSchema.statics.create = function (payload) {
    // this === Model
    const payment = new this(payload);
    // return Promise
    return payment.save()
};

paymentSchema.statics.findByAddress = function (address) {
    return this.find().or([{owner: address}, {payer: address}]).exec();
}

paymentSchema.statics.updateByPaymentId = function (paymentId, payload) {
    this.findOne({paymentId}).exec().then(result => {
        if (result === null) {
            return this.create(payload)
        } else {
            return this.findOneAndUpdate({paymentId}, payload, {new: true}).exec();
        }
    })
}


// Create Model & Export
module.exports = mongoose.model('Payment', paymentSchema);
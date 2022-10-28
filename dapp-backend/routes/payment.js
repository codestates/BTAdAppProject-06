const router = require('express').Router();
const Payment = require('../models/payment');

// Find All
router.get('/:address', (req, res) => {
    Payment.findByAddress(req.params.address)
        .then((payments) => {
            res.send(payments);
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;
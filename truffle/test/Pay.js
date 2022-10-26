const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
    balance
} = require('@openzeppelin/test-helpers');
const {expect} = require('chai');
const Pay = artifacts.require("Pay");

contract("Pay", (accounts) => {

    it("create payment", async () => {
        const payInstance = await Pay.deployed();
        const receipt = await payInstance.createPayment("abcd", 1000);
        expectEvent(receipt, 'CreatePayment', {paymentId: "abcd", owner: accounts[0], amount: BN(1000)});
    });

    it("reverts when duplicated payment id", async () => {
        const payInstance = await Pay.deployed();
        await expectRevert.unspecified(payInstance.createPayment("abcd", 1000));
    });

    it("make a payment", async () => {
        const payInstance = await Pay.deployed();

        const tracker = await balance.tracker(accounts[0])

        const receipt = await payInstance.makePayment("abcd", {value: 1000, from: accounts[1]})

        const delta = await tracker.delta("wei")

        expect(delta.toString()).to.equal('1000')
        await expectEvent(receipt, 'MakePayment', {
            paymentId: "abcd",
            owner: accounts[0],
            payer: accounts[1],
            amount: BN(1000)
        })
    });

    it("reverts when make a payment with invalid payment id", async () => {
        const payInstance = await Pay.deployed();
        await expectRevert.unspecified(payInstance.makePayment("abcde", {value: 1000, from: accounts[1]}));
    });

    it("reverts when make a payment with wrong amount", async () => {
        const payInstance = await Pay.deployed();
        await expectRevert.unspecified(payInstance.makePayment("abcd",  {value: 100, from: accounts[1]}));
    });
});
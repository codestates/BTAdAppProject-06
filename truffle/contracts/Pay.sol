// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Pay {
    enum TransactionStatus{SUCCESS, OPEN, OOD}
    struct Payment {
        string paymentId;
        address owner;
        address payer;
        uint256 amount;
        uint256 deadline;
        TransactionStatus status;
    }

    mapping(string => Payment) private payments;

    event CreatePayment(string paymentId, address owner, uint256 amount, uint256 deadline);
    event MakePayment(string paymentId, address owner, address payer, uint256 amount, uint256 deadline);



    function createPayment(string memory paymentId, uint256 amount) public {
        require(payments[paymentId].owner == address(0));
        payments[paymentId].paymentId = paymentId;
        payments[paymentId].owner = msg.sender;
        payments[paymentId].amount = amount;
        payments[paymentId].deadline = block.number + 600;
        payments[paymentId].status = TransactionStatus.OPEN;
        emit CreatePayment(paymentId, msg.sender, amount, block.number + 600);
    }

    function paymentStatus(string memory paymentId) public view returns (TransactionStatus){
        if (payments[paymentId].status == TransactionStatus.OPEN && payments[paymentId].deadline < block.number) {
            return TransactionStatus.OOD;
        }
        return payments[paymentId].status;
    }

    function makePayment(string memory paymentId) payable public {
        require(payments[paymentId].amount == msg.value);
        require(payments[paymentId].deadline >= block.number);
        require(payments[paymentId].status == TransactionStatus.OPEN);
        payments[paymentId].status = TransactionStatus.SUCCESS;
        payments[paymentId].payer = msg.sender;
        payable(payments[paymentId].owner).transfer(msg.value);
        emit MakePayment(paymentId, payments[paymentId].owner, msg.sender, msg.value, payments[paymentId].deadline);
    }
}
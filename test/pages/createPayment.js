import React, {useContext} from 'react';
import {View, Text, TextInput, Button} from "react-native";
import {web3Context} from "../context";
import 'react-native-get-random-values';
import {v4} from 'uuid';

function CreatePayment() {
    const {web3, contract} = useContext(web3Context);
    // 사용자 지갑 주소
    // web3에 이미 계정이 들어있다고 가정
    const owner = web3.eth.accounts.wallet.length >= 1 ? web3.eth.accounts.wallet[0].address : "empty"
    const [amount, onChangeAmount] = React.useState("0")
    const [deadline, changeDeadline] = React.useState("0")
    const [eventOwner, changeEventOwner] = React.useState("0")
    const [eventAmount, changeEventAmount] = React.useState("0")
    const [paymentId, changePaymentId] = React.useState("0")
    const [error, changeError] = React.useState("0")
    const createPayment = () => {
        let value = web3.utils.toWei(amount, "ether");
        let paymentId = v4();
        contract.methods.createPayment(paymentId, value).estimateGas({
            from: owner
        }).then((estimatedGas) => {
            contract.methods.createPayment(paymentId, value).send({
                from: owner,
                gas: estimatedGas
            }).then((receipt) => {
                console.log(receipt.events.CreatePayment.returnValues)
                changeDeadline(receipt.events.CreatePayment.returnValues.deadline)
                changeEventAmount(receipt.events.CreatePayment.returnValues.amount)
                changeEventOwner(receipt.events.CreatePayment.returnValues.owner)
                changePaymentId(receipt.events.CreatePayment.returnValues.paymentId)
            }).catch(error => {
                console.log(error)
                changeError("결제 생성 실패")
            });
        }).catch(error => {
            console.log(error)
            changeError("결제 생성 실패")
        });
    }
    return (
        <View>
            <Text>Create Payment{"\n"}</Text>
            <Text>Owner</Text>
            <TextInput
                value={owner}
                editable={false}
                selectTextOnFocus={false}
            />
            <Text>{"\n"}Amount</Text>
            <TextInput
                onChangeText={onChangeAmount}
                value={amount}
            />
            <Button title="확인" onPress={() => createPayment()}/>
            <Text>{eventAmount}</Text>
            <Text>{eventOwner}</Text>
            <Text>{deadline}</Text>
            <Text>{paymentId}</Text>

        </View>
    )
}

export default CreatePayment;

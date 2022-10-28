import React, {useContext} from 'react';
import {View, Text, TextInput, Button} from "react-native";
import {web3Context} from "../context";

function MakePayment() {
    const [paymentId, onChangePaymentId] = React.useState("input")
    const [amount, onChangeAmount] = React.useState("0")
    const [result, changeResult] = React.useState("")
    const {web3, contract} = useContext(web3Context);

    const makePayment = () => {
        const payer = web3.eth.accounts.wallet[0].address;
        const value = web3.utils.toWei(amount, "ether");
        contract.methods.makePayment(paymentId).estimateGas({
            from: payer,
            value: value
        }).then(estimatedGas => {
            contract.methods.makePayment(paymentId).send({
                from: payer,
                value: value,
                gas: estimatedGas
            }).then(receipt => {
                console.log(receipt)
                changeResult("결제 성공")
            }).catch(error => {
                console.log(error)
                changeResult("결제 실패")
            })
        }).catch(error => {
            console.log(error)
            changeResult("결제 실패")
        })
    }
    return (
        <View>
            <Text>Make Payment{"\n"}</Text>
            <Text>{"\n"}PaymentId</Text>
            <TextInput
                onChangeText={onChangePaymentId}
                value={paymentId}
            />
            <Text>{"\n"}Amount</Text>
            <TextInput
                onChangeText={onChangeAmount}
                value={amount}
            />
            <Button title="확인" onPress={() => makePayment()}/>
            <Text>{"\n"}{result}</Text>

        </View>
    )
}

export default MakePayment;

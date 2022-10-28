import React, {useContext} from 'react';
import {View, Text, TextInput, Button} from "react-native";
import {web3Context} from "../context";

function SendKlay() {
    const [amount, onChangeAmount] = React.useState("0")
    const [to, onChangeTo] = React.useState("input")
    const [result, changeResult] = React.useState("")
    const {web3} = useContext(web3Context);

    const sendKlay = () => {
        web3.eth.sendTransaction({
            from: web3.eth.accounts.wallet[0].address,
            to: to,
            value: web3.utils.toWei(amount, "ether"),
            gas: 21000
        }).then(receipt => {
            console.log(receipt)
            changeResult("송금 성공")
        }).catch(error=>{
            console.log(error)
            changeResult("송금 실패")
        })
    }
    return (
        <View>
            <Text>Send Klay</Text>
            <Text>{"\n"}To</Text>
            <TextInput
                onChangeText={onChangeTo}
                value={to}
            />
            <Text>{"\n"}Amount</Text>
            <TextInput
                onChangeText={onChangeAmount}
                value={amount}
            />
            <Button title="송금하기" onPress={() => {
                sendKlay()
            }}/>
            <Text>{"\n"}{result}</Text>

        </View>
    )
}

export default SendKlay;

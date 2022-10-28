import React from 'react';
import {View, Text, TextInput, Button} from "react-native";
import {web3Context} from "../context";

function ImportAccount() {
    const [text, onChangeText] = React.useState("Useless Text");
    return (
        <View>
            <TextInput
                onChangeText={onChangeText}
                value={text}
            />
            <Button title="추가" onPress={() => {
                web3Context._currentValue.web3.eth.accounts.wallet.add(text)
                console.log(web3Context._currentValue.web3.eth.accounts.wallet)
            }}></Button>
            <web3Context.Consumer>
                {value => <Text>{value.web3.eth.accounts.wallet.length.toString()}</Text>}
            </web3Context.Consumer>
        </View>
    )
}

export default ImportAccount;

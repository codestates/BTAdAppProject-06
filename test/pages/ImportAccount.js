import React, {useContext} from 'react';
import {View, Text, TextInput, Button} from "react-native";
import "react-native-get-random-values";
import {web3Context} from "../context";

function ImportAccount() {
    const {web3} = useContext(web3Context);
    const [text, onChangeText] = React.useState("Useless Text");
    const [encryptedWallet, changeEncryptedWallet] = React.useState();
    return (
        <View>
            <TextInput
                onChangeText={onChangeText}
                value={text}
            />
            <Button title="추가" onPress={() => {
                web3.eth.accounts.wallet.add(text)
                let enc = web3.eth.accounts.wallet.encrypt("password")
                changeEncryptedWallet(enc)
                console.log(web3.eth.accounts.wallet.decrypt(enc, "password"))
                console.log(web3.eth.accounts.wallet)
            }}></Button>
            <web3Context.Consumer>
                {value => <Text>{value.web3.eth.accounts.wallet.length.toString()}</Text>}
            </web3Context.Consumer>
            <Text>
                Encrypted Wallet : {JSON.stringify(encryptedWallet)}
            </Text>
        </View>
    )
}

export default ImportAccount;

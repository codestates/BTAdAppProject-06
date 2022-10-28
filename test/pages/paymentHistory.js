import React, { useContext } from "react";
import { View, Text } from "react-native";
import { web3Context } from "../context";

import axios from "axios";

function PaymentHistory() {
  const [history, changeHistory] = React.useState("");
  const { web3 } = useContext(web3Context);
  const retrieveHistory = () => {
    // 사용자 지갑 주소
    // web3에 이미 계정이 들어있다고 가정
    let address = web3.eth.accounts.wallet[0].address;
    console.log(address);
    axios.get(`http://34.64.123.78:4500/payments/${address}`).then((result) => {
      changeHistory(JSON.stringify(result.data));
    });
  };

  retrieveHistory();

  return (
    <View>
      <Text>{history}</Text>
    </View>
  );
}

export default PaymentHistory;

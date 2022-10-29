import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import PageFooter from '../components/PageFooter';
import PageTitle from '../components/PageTitle';
import PageWrapper from '../components/PageWrapper';
import Row from '../components/Row';
import CustomButton from '../components/CustomButton';
import { useWallet } from '../providers/WalletProvider';

const NormalText = styled.Text`
  font-size: 24px;
`;
const TableRow = styled(Row)`
  margin-bottom: 24px;
`;

export default function MakePayment({ route, navigation }) {
  const { uuid, klayPrice, date } = route.params;
  const { account, web3, payContract } = useWallet();

  const price = useMemo(() => Number(klayPrice) * 1.2, []);

  const pay = useCallback(async () => {
    const value = web3.utils.toWei(klayPrice, "ether");
    try {
      const estimatedGas = await payContract.methods.makePayment(uuid).estimateGas({
        from: account,
        value: value
      });
      const receipt = await payContract.methods.makePayment(uuid).send({
        from: account,
        value: value,
        gas: estimatedGas
      });
  
      console.log(receipt);
    } catch(e) {
      console.error(e);
    }

  }, [uuid, klayPrice, account, web3]);

return (
  <PageWrapper>
    <PageHeader>
      <PageTitle>결제 확인</PageTitle>
    </PageHeader>
    <PageContent>
      <TableRow>
        <NormalText>결제 ID</NormalText>
        <NormalText>{uuid}</NormalText>
      </TableRow>
      <TableRow>
        <NormalText>금액</NormalText>
        <NormalText>{price}원</NormalText>
      </TableRow>
      <TableRow>
        <NormalText>남은 시간</NormalText>
        <NormalText>{date}</NormalText>
      </TableRow>

      <TableRow>
        <NormalText>결제 수량</NormalText>
        <NormalText>{klayPrice} KLAY</NormalText>
      </TableRow>

    </PageContent>
    <PageFooter>
      <CustomButton onPress={pay}>결제하기</CustomButton>
    </PageFooter>

  </PageWrapper>
);
}

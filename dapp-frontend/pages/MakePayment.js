import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import PageWrapper from '../components/PageWrapper';


export default function MakePayment({ route, navigation }) {
  const { uuid } = route.params;
  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>결제 확인</PageTitle>
      </PageHeader>
      <PageContent>
        <Row>
          <Col><Text>결제 ID</Text></Col>
          <Col><Text>{uuid}</Text></Col>
        </Row>
        <Row>
          <Col><Text>금액</Text></Col>
          <Col><Text>1,000원</Text></Col>
        </Row>
        <Row>
          <Col><Text>남은 시간</Text></Col>
          <Col><Text>8분 20초</Text></Col>
        </Row>
      </PageContent>
    </PageWrapper>
  );
}

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #f0f0ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function ScanQR({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);

    useEffect(() => {
      const { redirectTo } = route.params;
      if(!redirectTo) {
        alert(`Invalid Access`);
      }
    }, [route]);
  
    const handleCodeScanned = ({ type, data }) => {
      setScanned(true);
      const params = JSON.parse(data);
      console.log(params);
      const { redirectTo } = route.params;
      navigation.navigate(redirectTo, params);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <Wrapper>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        {scanned && <Button title={'다시 스캔하기'} onPress={() => setScanned(false)} />}
      </Wrapper>
    );
}

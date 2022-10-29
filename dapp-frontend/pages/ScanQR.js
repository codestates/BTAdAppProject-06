import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CameraWrapper = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CameraHeader = styled.View`
    background-color: #00000080;
    height: 30%;
    width: 100%;
`;
const CameraBody = styled.View`
    height: 35%;
    width: 100%;
    flex-direction: row;
`;
const CameraBodyLeft = styled.View`
    background-color: #00000080;
    width: 20%;
    height: 100%;
`;
const CameraBodyCenter = styled.View`
    border-width: 3px;
    border-radius: 2px;
    border-color: #5e72e4;
    width: 60%;
    height: 100%;
    padding: 50px;
`;
const CameraBodyRight = styled.View`
    background-color: #00000080;
    width: 20%;
    height: 100%;
`;
const CameraFooter = styled.View`
    padding-top: 10px;
    height: 35%;
    width: 100%;
    background-color: #00000080;
    flex-direction: row;
    justify-content: center;
`;

const InfoWrapper = styled.View`
    width: 90%;
    height: 10%;
    opacity: 1;
    background: transparent;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const InfoText = styled.Text`
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
`;

export default function ScanQR({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    useEffect(() => {
        const { redirectTo } = route.params;
        if (!redirectTo) {
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
            >
                <CameraWrapper>
                    <CameraHeader></CameraHeader>
                    <CameraBody>
                        <CameraBodyLeft></CameraBodyLeft>
                        <CameraBodyCenter></CameraBodyCenter>
                        <CameraBodyRight></CameraBodyRight>
                    </CameraBody>
                    <CameraFooter>
                        <AntDesign name="qrcode" size={24} color="#ffffff" />
                        <InfoText>{"  "}QR 코드를 스캔하세요.</InfoText>
                    </CameraFooter>
                </CameraWrapper>
            </BarCodeScanner>
            {scanned && (
                <Button
                    title={"다시 스캔하기"}
                    onPress={() => setScanned(false)}
                />
            )}
        </Wrapper>
    );
}
/*
                    <CameraLineWrapper></CameraLineWrapper>

                    <InfoWrapper>
                        <AntDesign name="qrcode" size={24} color="#ffffff" />
                        <InfoText>{"  "}QR 코드를 스캔하세요.</InfoText>
                    </InfoWrapper>
*/

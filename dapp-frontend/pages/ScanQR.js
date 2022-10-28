import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #f0f0ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function ScanQR({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [uuid, setUuid] = useState("");

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleCodeScanned = ({ type, data }) => {
        setScanned(true);
        setUuid(data);
        alert(`UUID : ${data}`);
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
            {scanned && (
                <Button
                    title={"다시 스캔하기"}
                    onPress={() => setScanned(false)}
                />
            )}
        </Wrapper>
    );
}

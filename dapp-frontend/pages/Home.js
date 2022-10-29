import { Text, View } from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import { Fontisto } from "@expo/vector-icons";
import { useEffect } from "react";
import { ActivityIndicator } from "@react-native-material/core";
import { useWallet } from "../providers/WalletProvider";
import { MaterialIcons, Octicons, Ionicons } from "@expo/vector-icons";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #f0f0ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.View`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const AssetsWrapper = styled.View`
    height: 25%;
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AssetsContent = styled.View`
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AssetsContentRoad = styled.View`
    width: 10%;
    height: 90%;
    align-items: center;
`;
const LoadTouch = styled.TouchableOpacity``;

const MainContentWrapper = styled.View`
    height: 70%;
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainContent = styled.View`
    width: 90%;
    height: 100%;
`;

const MainContentHeader = styled.View`
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-color: #4f4f4f;
    border-bottom-width: 1px;
    border-style: solid;
    justify-content: space-between;
`;
const MainContentHeaderLeft = styled.View`
    flex-direction: row;
`;

const MainHeaderContentName = styled.Text`
    font-size: 14px;
    padding-left: 10px;
    font-weight: bold;
`;

const MainContentBody = styled.View`
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainContentButtonWrapper = styled.View`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const DivButton = styled.TouchableOpacity`
    background-color: #5e72e4;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px;
    border-radius: 5px;
`;

const MainButtonText = styled.Text`
    color: #ffffff;
`;
const AddressText = styled.Text`
    color: #525f7f;
    padding: 5px;
    font-weight: bold;
`;

export default function Home({ navigation }) {
    const { account, balance, nickName, klayToKrw, loadBalance } = useWallet();
    //console.log(account);

    return (
        <Wrapper>
            <ContentWrapper>
                <AssetsWrapper>
                    <AssetsContent>
                        <Text>{balance?.toString()} klay</Text>
                        <Text>
                            {`1 klay 당 ${klayToKrw}원` +
                                "  => " +
                                balance * parseInt(klayToKrw).toString() +
                                " 원"}
                        </Text>
                    </AssetsContent>
                    <AssetsContentRoad>
                        <LoadTouch onPress={() => loadBalance()}>
                            <Ionicons
                                name="ios-reload-outline"
                                size={24}
                                color="black"
                            />
                        </LoadTouch>
                    </AssetsContentRoad>
                </AssetsWrapper>
                <MainContentWrapper>
                    <MainContent>
                        <MainContentHeader>
                            <MainContentHeaderLeft>
                                <Fontisto
                                    name="google-wallet"
                                    size={24}
                                    color="black"
                                />
                                <MainHeaderContentName>
                                    CONNECTING
                                </MainHeaderContentName>
                            </MainContentHeaderLeft>
                            <LoadTouch
                                onPress={() => navigation.push("History")}
                            >
                                <MaterialIcons
                                    name="history-edu"
                                    size={24}
                                    color="black"
                                />
                            </LoadTouch>
                        </MainContentHeader>
                        <MainContentBody>
                            <QRCode value={account} />
                            <AddressText>
                                {nickName ? "Hello! 👋 " + nickName : account}
                            </AddressText>
                        </MainContentBody>
                        <MainContentButtonWrapper>
                            <DivButton
                                color="#5e72e4"
                                onPress={() => navigation.navigate("Send")}
                            >
                                <MainButtonText>송금하기</MainButtonText>
                            </DivButton>
                            <DivButton
                                color="#6e72e4"
                                onPress={() => {
                                    navigation.navigate("CreatePayment");
                                }}
                            >
                                {balance === null ? (
                                    <ActivityIndicator color="blue" />
                                ) : null}
                                <MainButtonText>
                                    {balance === null ? "loading" : "결제생성"}
                                </MainButtonText>
                            </DivButton>
                            <DivButton
                                color="#6e72e4"
                                onPress={() =>
                                    navigation.push("Scan", {
                                        redirectTo: "MakePayment",
                                    })
                                }
                            >
                                <MainButtonText>QR 스캔</MainButtonText>
                            </DivButton>
                        </MainContentButtonWrapper>
                    </MainContent>
                </MainContentWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

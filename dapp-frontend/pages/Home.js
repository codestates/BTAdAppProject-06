import { Button, Text, View } from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import { Fontisto } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDB } from "../context";
import { useNavigation } from "@react-navigation/native";

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
    height: 20%;
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AssetsContent = styled.View`
    width: 95%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
`;

const MainHeaderContentName = styled.Text`
    font-size: 14px;
    padding-left: 10px;
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
const StyledButton = styled(Button)`
    color: #000000;
    width: 33%;
    border-radius: 1px solid #000000;
`;

export default function Home({ navigation }) {
    const { realm, changePassword, password } = useDB();

    return (
        <Wrapper>
            <ContentWrapper>
                <AssetsWrapper>
                    <AssetsContent>
                        <Text>코인</Text>
                        <Text>환율</Text>
                    </AssetsContent>
                </AssetsWrapper>
                <MainContentWrapper>
                    <MainContent>
                        <MainContentHeader>
                            <Fontisto
                                name="google-wallet"
                                size={24}
                                color="black"
                            />
                            <MainHeaderContentName>name</MainHeaderContentName>
                        </MainContentHeader>
                        <MainContentBody>
                            <QRCode value="http://awesome.link.qr" />
                            <Text>address</Text>
                        </MainContentBody>
                        <MainContentButtonWrapper>
                            <StyledButton color="#000000" title="송금하기" />
                            <StyledButton
                                color="#000000"
                                title="QR 스캔"
                                onPress={() => {
                                    navigation.navigate("ScanQR", {
                                        redirectTo: 'MakePayment'
                                    });
                                }}
                            />
                            <StyledButton color="#000000" title="결제 내역" />
                        </MainContentButtonWrapper>
                    </MainContent>
                </MainContentWrapper>
            </ContentWrapper>
        </Wrapper>
    );
}

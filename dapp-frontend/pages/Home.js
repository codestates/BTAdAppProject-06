import { Button, Text, View } from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import { Fontisto } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDB } from "../context";
import { useNavigation } from "@react-navigation/native";
import { TableName } from "../utils/userInfo";
import { coinsApi } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { toKlay } from "../utils/wallet";

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
const DivButton = styled.TouchableOpacity`
    background-color: #5e72e4;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px;
    border-radius: 5px;
`;
//color: #000000;
//width: 33%;
//border-radius: 1px solid #000000;
const MainButtonText = styled.Text`
    color: #ffffff;
`;
const AddressText = styled.Text`
    color: #525f7f;
    padding: 5px;
`;

export default function Home({ navigation }) {
    const { realm, changeWonExchange, web3 } = useDB();
    const [address, setAddr] = useState();
    const [balance, setBalance] = useState(0);
    const {
        data: price,
        isLoading,
        error,
    } = useQuery(["coin"], coinsApi.getKlayPriceKrw);
    //console.log(price);
    useEffect(() => {
        const userInfo = realm.objects(TableName)[0];
        //const price = coinsApigetKlayPriceKrw();
        //console.log(userInfo.secureKey);
        const wallet = web3.eth.accounts.wallet.add(userInfo.secureKey);
        console.log(wallet);

        web3.eth
            .getBalance(userInfo.address)
            .then((res) => setBalance(toKlay(res)));
        //console.log(balance);
        //console.log(balance);
        setAddr(userInfo.address);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            changeWonExchange(price["klay-token"]["krw"]);
        }
    }, [price]);
    return (
        <Wrapper>
            <ContentWrapper>
                <AssetsWrapper>
                    <AssetsContent>
                        <Text>{balance} klay</Text>
                        <Text>
                            {" "}
                            {isLoading
                                ? null
                                : `1 klay 당 ${price["klay-token"]["krw"]}원` +
                                  "  => " +
                                  balance *
                                      parseInt(
                                          price["klay-token"]["krw"]
                                      ).toString() +
                                  " 원"}
                        </Text>
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
                            <QRCode value={address} />
                            <AddressText>{address}</AddressText>
                        </MainContentBody>
                        <MainContentButtonWrapper>
                            <DivButton color="#5e72e4">
                                <MainButtonText>송금하기</MainButtonText>
                            </DivButton>
                            <DivButton
                                color="#6e72e4"
                                onPress={() => navigation.push("Pay")}
                            >
                                <MainButtonText>
                                    {isLoading ? "loading" : "결제생성"}
                                </MainButtonText>
                            </DivButton>
                            <DivButton
                                color="#6e72e4"
                                onPress={() => navigation.push("Scan")}
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

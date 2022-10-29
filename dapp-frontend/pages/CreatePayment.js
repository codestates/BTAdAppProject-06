import styled from "styled-components/native";
import {
    ActivityIndicator,
    ListItem,
    TextInput,
} from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { Alert, Text } from "react-native";
//import { ToastAndroid } from "react-native";
import { TableName } from "../utils/userInfo";
//import { parse } from "react-native-svg";
import * as SplashScreen from "expo-splash-screen";
import { useRealm } from "../providers/RealmProvider";
import { useWallet } from "../providers/WalletProvider";
import getPayContract from "../utils/getPayContract";

const Wrapper = styled.View`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const ContentWrapper = styled.View`
    height: 90%;
    width: 90%;
`;

const HeaderWrapper = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
`;

const HeaderTextWrapper = styled.View`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const HeaderText = styled.Text`
    font-size: 24px;
    color: #525f7f;
`;

const HeaderLodingWrapper = styled.View`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const BodyWrapper = styled.View`
    height: 50%;
    width: 100%;
`;
const BodyContentWrapper = styled.View`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
`;
const BodyContentHeader = styled.View`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BodyContentHeaderText = styled.Text`
    font-size: 18px;
    color: #525f7f;
`;
const BodyInputWrapper = styled.View`
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
`;
// here
const BodyInputFeeWrapper = styled.View`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const ContentFooter = styled.View`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper = styled.View`
    width: 60%;
    height: 55%;
    border-radius: 10px;
`;

const CreatePayButton = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #5e72e4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CreateButtonText = styled.Text`
    color: #ffffff;
    font-size: 18px;
`;
const ReloadButton = styled.TouchableOpacity``;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function CreatePayment({ navigation }) {
    const [payDoc, setPayDoc] = useState({ klayPrice: 0 });
    const realm = useRealm();
    const { web3, payContract, account, klayToKrw } = useWallet();
    const [fee, setFee] = useState(1);

    const getFee = () => {
        let value = web3.utils.toWei(payDoc.klayPrice.toString(), "ether");

        const contract = getPayContract(web3);
        contract.methods
            .createPayment(payDoc.uuid, value)
            .estimateGas({
                from: payDoc.address,
            })
            .then((gas) => {
                setFee(gas);
            });
    };

    const createPayment = async () => {
        if (!payDoc.uuid || !payDoc.klayPrice) {
            return;
        }
        let value = web3.utils.toWei(payDoc.klayPrice.toString(), "ether");
        console.log(value, account);
        console.log(web3.eth.accounts.wallet[0]);
        const contract = getPayContract(web3);
        try {
            const estimatedGas = await contract.methods
                .createPayment(payDoc.uuid, value)
                .estimateGas({
                    from: account,
                });
            const receipt = await contract.methods
                .createPayment(payDoc.uuid, value)
                .send({
                    from: account,
                    gas: estimatedGas,
                });

            //ToastAndroid("결제 생성 성공", receipt);
            console.log(receipt);
            // TODO : Navigation 파라미터로 넘기고, 이후 QRModal에서 처리 필요
            navigation.navigate("QRModal", payDoc);
        } catch (e) {
            console.error(e, "실패s");
        }
    };

    useEffect(() => {
        setPayDoc({
            ...payDoc,
            uuid: uuid.v4(),
        });
    }, []);

    const changePrice = (txt) => {
        const calPrice = parseInt(txt) / parseInt(klayToKrw);
        setPayDoc({
            ...payDoc,
            klayPrice: calPrice,
        });
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <HeaderWrapper>
                    <HeaderTextWrapper>
                        <HeaderText>결제 생성</HeaderText>
                    </HeaderTextWrapper>
                    <HeaderLodingWrapper>
                        <Ionicons name="reload" size={24} color="black" />
                    </HeaderLodingWrapper>
                </HeaderWrapper>
                <BodyWrapper>
                    <BodyContentWrapper>
                        <BodyContentHeader>
                            <BodyContentHeaderText>
                                일련번호
                            </BodyContentHeaderText>
                        </BodyContentHeader>
                        <BodyInputWrapper>
                            <ListItem title={payDoc.uuid} />
                        </BodyInputWrapper>
                    </BodyContentWrapper>
                    <BodyContentWrapper>
                        <BodyContentHeader>
                            <BodyContentHeaderText>금액</BodyContentHeaderText>
                        </BodyContentHeader>
                        <BodyInputWrapper>
                            <TextInput
                                label={
                                    setPayDoc.klayPrice === 0
                                        ? "원하는 금액을 입력하세요."
                                        : null
                                }
                                onChangeText={(txt) => changePrice(txt)}
                                helperText={`${payDoc["klayPrice"]} klay`}
                            ></TextInput>
                        </BodyInputWrapper>
                    </BodyContentWrapper>
                    <BodyContentWrapper>
                        <BodyContentHeader>
                            <BodyContentHeaderText>
                                예상 수수료
                            </BodyContentHeaderText>
                        </BodyContentHeader>
                        <BodyInputFeeWrapper>
                            <Text>{""}</Text>
                            <Text>{fee !== 1 ? `${fee} gas` : "1 klay"}</Text>
                            <ReloadButton onPress={() => getFee()}>
                                <Ionicons
                                    name="reload"
                                    size={24}
                                    color="black"
                                />
                            </ReloadButton>
                        </BodyInputFeeWrapper>
                    </BodyContentWrapper>
                </BodyWrapper>
                <ContentFooter>
                    <ButtonWrapper>
                        <CreatePayButton onPress={() => createPayment()}>
                            <CreateButtonText>결제 생성</CreateButtonText>
                        </CreatePayButton>
                    </ButtonWrapper>
                </ContentFooter>
            </ContentWrapper>
        </Wrapper>
    );
}

import styled from "styled-components/native";
import {
    ActivityIndicator,
    ListItem,
    TextInput,
} from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useDB } from "../context";
import { Alert, Text } from "react-native";
//import { ToastAndroid } from "react-native";
import { TableName } from "../utils/userInfo";
//import { parse } from "react-native-svg";
import * as SplashScreen from "expo-splash-screen";

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

export default function Payment({ navigation }) {
    const [payDoc, setPayDoc] = useState({ klayPrice: 0 });
    const { realm, won, changePay, web3, contract, password } = useDB();
    ///const [isReady, setIsReady] = useState(false);
    //const [addr, setAddr] = useState();
    const [fee, setFee] = useState(1);

    const getFee = () => {
        let value = web3.utils.toWei(payDoc.klayPrice.toString(), "ether");
        contract.methods
            .createPayment(payDoc.uuid, value)
            .estimateGas({
                from: payDoc.address,
            })
            .then((gas) => {
                setFee(gas);
            });
    };

    const createPayment = () => {
        if (!payDoc.uuid || !payDoc.klayPrice) {
            return;
        }
        let value = web3.utils.toWei(payDoc.klayPrice.toString(), "ether");
        console.log(value);
        contract.methods
            .createPayment(payDoc.uuid, value)
            .estimateGas({
                from: payDoc.address,
            })
            .then((gas) => {
                console.log(payDoc);
                contract.methods
                    .createPayment(payDoc.uuid, value)
                    .send({
                        from: "0x5386Bf90EaC5A5638B9Eb56F8Dd187c3B4848211",
                        gas: gas,
                    })
                    .then((receipt) => {
                        //ToastAndroid("결제 생성 성공", receipt);
                        console.log(receipt);
                        changePay(payDoc);
                        navigation.navigate("QRModal");
                    })
                    .catch((err) => {
                        Alert.alert(err);
                        console.error(err, "실패s");
                    });
            })
            .catch((err) => {
                Alert.alert(err);
                console.error("실패", err);
            });
    };

    useEffect(() => {
        const info = realm.objects(TableName)[0];
        const encPriv = JSON.parse(info.secureKey);
        //console.log(encPriv);
        //console.log(encPriv);

        let wallet = web3.eth.accounts.decrypt(encPriv, password);
        // 필수적으로 해야함
        web3.eth.accounts.wallet.add(wallet.privateKey);

        console.log(wallet);

        setPayDoc({
            ...payDoc,
            uuid: uuid.v4(),
            address: wallet.address,
        });
    }, []);
    const changePrice = (txt) => {
        const calPrice = parseInt(txt) / parseInt(won);
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
                            ></TextInput>
                            <ListItem title={`${payDoc["klayPrice"]} klay`} />
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

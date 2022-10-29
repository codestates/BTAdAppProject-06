import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    ListItem,
    TextInput,
} from "@react-native-material/core";
import { useWallet } from "../providers/WalletProvider";
import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { intValidate } from "../utils/userInfo";
import { Alert, ScrollView, ToastAndroid } from "react-native";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
`;

const WrapperContent = styled.View`
    width: 90%;
    height: 90%;
`;

const ContentHeader = styled.View`
    width: 100%;
    height: 15%;
    flex-direction: row;
`;
const ContentHeaderTextWrapper = styled.View`
    width: 60%;
    height: 100%;
    align-items: flex-end;
`;
const ContentHeaderText = styled.Text`
    color: #525f7f;
    font-size: 18px;
    font-weight: bold;
`;
const ContentHeaderLoadingWrapper = styled.View`
    width: 40%;
    height: 100%;
    align-items: flex-end;
`;
const LoadingTouch = styled.TouchableOpacity``;

const ContentBody = styled.View`
    width: 100%;
    height: 70%;
    justify-content: space-around;
`;

const ContentBodyInfo = styled.View`
    width: 100%;
    height: 15%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ContentBodyInfoHeader = styled.View`
    width: 30%;
    height: 80%;
    justify-content: center;
    align-items: center;
`;
const ContentBodyInfoHeaderText = styled.Text`
    font-size: 14px;
    color: #525f7f;
`;
const ContentBodyInfoContent = styled.View`
    width: 50%;
    height: 90%;
    justify-content: center;
`;

const ContentFooter = styled.View`
    width: 100%;
    height: 15%;
    justify-content: center;
    align-items: center;
`;
const ContentFooterButtonWrapper = styled.TouchableOpacity`
    width: 70%;
    height: 50%;
    border-radius: 10px;
    background-color: #5e72e4;
    justify-content: center;
    align-items: center;
`;

const ContentFooterText = styled.Text`
    color: #ffffff;
    font-weight: bold;
`;
const AddressText = styled.Text`
    font-size: 12px;
`;
const ErrorText = styled.Text`
    color: #d84b4b;
`;

export default function Send({ navigation }) {
    const { web3, payContract, account, klayToKrw, balance, noti } =
        useWallet();
    const [klay, setKlay] = useState("0");
    const [fee, setFee] = useState(1);
    const [sendKlay, setSendKlay] = useState(0);
    const [formError, setFormError] = useState({ klay: false, address: false });
    const [sendAddress, setSendAddress] = useState();
    const [loading, setLoading] = useState(false);

    //console.log(account);
    const changeSendKlay = (klay) => {
        if (!intValidate(klay)) {
            console.log("false");
            setSendKlay(parseInt(1));
            setFormError({ ...formError, klay: true });
            return;
        }

        setFormError({ ...formError, klay: false });
        setSendKlay(parseInt(klay));
    };
    const changeSendAddress = (v) => {
        setSendAddress(v);
    };

    const completeForm = () => {
        //setLoading(true);

        if (!web3.utils.isAddress(sendAddress)) {
            setFormError({ ...formError, address: true });

            //setLoading(false);
            return;
        }

        const value = web3.utils.toWei(sendKlay.toString(), "ether");

        web3.eth
            .sendTransaction({
                from: account,
                to: sendAddress,
                value: value,
                gas: 21000,
            })
            .then((receipt) => {
                console.log(receipt);
                noti("송금 완료", sendKlay + "  KLAY 전송");
                navigation.push("SendModal", {
                    klay: sendKlay,
                    receipt: receipt,
                    sendAddress: account,
                    receiver: sendAddress,
                    fee: fee,
                });
            })
            .catch((err) => {
                Alert.alert("filed", err);
                console.log(err);
            });
        //setLoading(false);
    };

    useEffect(() => {
        //console.log(balance, balance["c"]);
        setFee(
            web3.utils.fromWei(
                web3.utils.toBN("50000000000").mul(web3.utils.toBN(21000)),
                "ether"
            )
        );
        //setKlay(balance);
    }, [balance]);

    return (
        <Wrapper>
            <WrapperContent>
                <ContentHeader>
                    <ContentHeaderTextWrapper>
                        <ContentHeaderText>
                            송금하기 {loading ? "lloading" : null}
                        </ContentHeaderText>
                    </ContentHeaderTextWrapper>
                    <ContentHeaderLoadingWrapper>
                        <LoadingTouch>
                            <Ionicons name="reload" size={24} color="#000000" />
                        </LoadingTouch>
                    </ContentHeaderLoadingWrapper>
                </ContentHeader>
                <ContentBody>
                    <ContentBodyInfo>
                        <ContentBodyInfoHeader>
                            <ContentBodyInfoHeaderText>
                                보내는 사람
                            </ContentBodyInfoHeaderText>
                        </ContentBodyInfoHeader>
                        <ContentBodyInfoContent>
                            <ListItem
                                title={<AddressText>{account}</AddressText>}
                            ></ListItem>
                        </ContentBodyInfoContent>
                    </ContentBodyInfo>
                    <ContentBodyInfo>
                        <ContentBodyInfoHeader>
                            <ContentBodyInfoHeaderText>
                                받는 사람
                            </ContentBodyInfoHeaderText>
                        </ContentBodyInfoHeader>
                        <ContentBodyInfoContent>
                            <TextInput
                                onChangeText={(v) => changeSendAddress(v)}
                                helperText={
                                    formError.address ? (
                                        <ErrorText>
                                            주소 확인해주세요.
                                        </ErrorText>
                                    ) : null
                                }
                            ></TextInput>
                        </ContentBodyInfoContent>
                    </ContentBodyInfo>
                    <ContentBodyInfo>
                        <ContentBodyInfoHeader>
                            <ContentBodyInfoHeaderText>
                                잔액
                            </ContentBodyInfoHeaderText>
                        </ContentBodyInfoHeader>
                        <ContentBodyInfoContent>
                            <ListItem
                                title={balance.c + " KLAY"}
                                secondaryText={
                                    klayToKrw * parseInt(balance.c) + " 원"
                                }
                            ></ListItem>
                        </ContentBodyInfoContent>
                    </ContentBodyInfo>
                    <ContentBodyInfo>
                        <ContentBodyInfoHeader>
                            <ContentBodyInfoHeaderText>
                                수량
                            </ContentBodyInfoHeaderText>
                        </ContentBodyInfoHeader>
                        <ContentBodyInfoContent>
                            <TextInput
                                helperText={
                                    formError.klay ? (
                                        <ErrorText>
                                            숫자만 입력해주세요.
                                        </ErrorText>
                                    ) : (
                                        sendKlay * klayToKrw + "원"
                                    )
                                }
                                onChangeText={(txt) => changeSendKlay(txt)}
                            ></TextInput>
                        </ContentBodyInfoContent>
                    </ContentBodyInfo>
                    <ContentBodyInfo>
                        <ContentBodyInfoHeader>
                            <ContentBodyInfoHeaderText>
                                예상 수수료
                            </ContentBodyInfoHeaderText>
                        </ContentBodyInfoHeader>
                        <ContentBodyInfoContent>
                            <ListItem
                                title={fee}
                                secondaryText={
                                    fee * parseInt(klayToKrw) + " 원"
                                }
                            ></ListItem>
                        </ContentBodyInfoContent>
                    </ContentBodyInfo>
                </ContentBody>
                <ContentFooter>
                    <ContentFooterButtonWrapper onPress={() => completeForm()}>
                        <ContentFooterText>
                            {loading ? <ActivityIndicator /> : "전송"}
                        </ContentFooterText>
                    </ContentFooterButtonWrapper>
                </ContentFooter>
            </WrapperContent>
        </Wrapper>
    );
}

import styled from "styled-components/native";
import { ListItem, TextInput } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useDB } from "../context";
//import { parse } from "react-native-svg";

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

export default function Payment({ navigation }) {
    const [payDoc, setPayDoc] = useState({ klayPrice: 0 });
    const { won, changePay } = useDB();

    useEffect(() => {
        setPayDoc({ ...payDoc, uuid: uuid.v4() });
    }, []);
    const changePrice = (txt) => {
        const calPrice = parseInt(txt) / parseInt(won);
        setPayDoc({
            ...payDoc,
            klayPrice: calPrice,
        });
    };
    const completeForm = () => {
        if (!payDoc.uuid || !payDoc.klayPrice) {
            return;
        }
        changePay(payDoc);
        navigation.navigate("QRModal");
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
                        <BodyInputWrapper>
                            <ListItem title="1 klay" />
                        </BodyInputWrapper>
                    </BodyContentWrapper>
                </BodyWrapper>
                <ContentFooter>
                    <ButtonWrapper>
                        <CreatePayButton onPress={() => completeForm()}>
                            <CreateButtonText>결제 생성</CreateButtonText>
                        </CreatePayButton>
                    </ButtonWrapper>
                </ContentFooter>
            </ContentWrapper>
        </Wrapper>
    );
}

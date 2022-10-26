import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { TextInput } from "react-native-web";
import { StyleSheet } from "react-native";

const LogoText = styled.Text`
    color: #000000;
    font-size: 24px;
    padding-left: 10px;
`;

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const ContentWrapper = styled.View`
    width: 85%;
    height: 85%;
`;

const Header = styled.View`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Body = styled.View`
    height: 80%;
`;

const BodyHeader = styled.View`
    height: 15%;
`;

const BodyHeaderText = styled.Text`
    color: #525f7f;
    font-size: 24px;
`;

const BodyContent = styled.Text`
    width: 100%;
    height: 85%;
`;

export default function ImportWallet() {
    return (
        <Wrapper>
            <ContentWrapper>
                <Header>
                    <Fontisto name="google-wallet" size={50} color="black" />
                    <LogoText>Wallet</LogoText>
                </Header>
                <Body>
                    <BodyHeader>
                        <BodyHeaderText>시드를 입력해주세요</BodyHeaderText>
                    </BodyHeader>
                    <BodyContent></BodyContent>
                </Body>
            </ContentWrapper>
        </Wrapper>
    );
}

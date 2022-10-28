import {
    //Button,
    StyleSheet,
    //Text,
    //TextInput,
    TouchableOpacity,
    //View,
} from "react-native";
import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WrapperContent = styled.View`
    width: 90%;
    height: 80%;
`;

const LogoWrapper = styled.View`
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonWrapper = styled.View`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const LogoText = styled.Text`
    color: #000000;
    font-size: 24px;
`;

const DivButton = styled(TouchableOpacity)`
    font-size: 400px;
    width: 90%;
    height: 30%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    background-color: #5e72e4;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #ffffff;
`;

export default function Register({ navigation }) {
    return (
        <Wrapper>
            <WrapperContent>
                <LogoWrapper>
                    <Fontisto name="google-wallet" size={100} color="black" />
                    <LogoText>CONNECTING</LogoText>
                </LogoWrapper>
                <ButtonWrapper>
                    <DivButton
                        onPress={() => {
                            navigation.navigate("RegisterImport");
                        }}
                    >
                        <ButtonText>지갑 가져오기</ButtonText>
                    </DivButton>
                    <DivButton
                        onPress={() => {
                            navigation.navigate("RegisterNew");
                        }}
                    >
                        <ButtonText>지갑 만들기</ButtonText>
                    </DivButton>
                </ButtonWrapper>
            </WrapperContent>
        </Wrapper>
    );
}

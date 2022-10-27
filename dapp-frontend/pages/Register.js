import { Button, StyleSheet, TextInput, View } from "react-native";
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

const DivButton = styled.View`
    font-size: 400px;
    width: 90%;
    height: 30%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.Button`
    height: 100%;
    width: 100%;
`;

export default function Register({ navigation }) {
    return (
        <Wrapper>
            <WrapperContent>
                <LogoWrapper>
                    <Fontisto name="google-wallet" size={100} color="black" />
                    <LogoText>Wallet</LogoText>
                </LogoWrapper>
                <ButtonWrapper>
                    <DivButton>
                        <StyledButton
                            color="#5e72e4"
                            title="지갑 가져오기"
                            onPress={() => {
                                navigation.navigate("RegisterImport");
                            }}
                        />
                    </DivButton>
                    <DivButton>
                        <StyledButton
                            color="#5e72e4"
                            title="지갑 만들기"
                            onPress={() => {
                                navigation.navigate("RegisterNew");
                            }}
                        />
                    </DivButton>
                </ButtonWrapper>
            </WrapperContent>
        </Wrapper>
    );
}
const inputStyle = StyleSheet.create({
    input: {
        backgroundColor: "white",
    },
});

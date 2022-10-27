import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput as Ti } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
    Stack,
    TextInput,
    IconButton,
    Button,
} from "@react-native-material/core";

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
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Body = styled.View`
    height: 70%;
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

const UserInfoHeader = styled.View`
    width: 100%;
    height: 10%;
    padding: 10px 0 10px 0;
`;
const UserInfoText = styled.Text`
    padding-left: 10px;
    color: #525f7f;
    font-size: 24px;
`;

const NextWrapper = styled.View`
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NextButton = styled.TouchableOpacity`
    width: 80%;
    height: 90%;
    background-color: #5e72e4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    color: #ffffff;
`;

const ButtonText = styled.Text`
    color: #ffffff;
`;

export default function ImportWallet() {
    const [value, onChangeText] = useState("");
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
                    <BodyContent>
                        <SafeAreaView>
                            <Ti
                                value={value}
                                onChangeText={(text) => onChangeText(text)}
                                multiline
                                maxLength={10}
                                placeholder="input seed key"
                                style={styles.input}
                            ></Ti>
                        </SafeAreaView>
                        <UserInfoHeader>
                            <UserInfoText>정보를 입력하세요</UserInfoText>
                            <Stack style={{ width: 300 }}>
                                <TextInput
                                    variant="outlined"
                                    label="nickname"
                                    style={{ width: 300, padding: 10 }}
                                ></TextInput>
                                <TextInput
                                    variant="outlined"
                                    label="password"
                                    style={{ width: 300, padding: 10 }}
                                ></TextInput>
                            </Stack>
                        </UserInfoHeader>
                    </BodyContent>
                    <Button
                        title="완료"
                        style={{
                            alignSelf: "center",
                            marginTop: 40,
                            height: 50,
                            width: 100,
                        }}
                        color="#5e72e4"
                    />
                </Body>
            </ContentWrapper>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 150,
        width: 320,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

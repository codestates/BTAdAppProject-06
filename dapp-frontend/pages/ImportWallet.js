import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TextInput as Ti } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { pwValidate, TableName } from "../utils/userInfo";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { aes256Encrypt, md5Encrypt, ojbToString } from "../utils/wallet";
import "react-native-get-random-values";
import { useRealm } from "../providers/RealmProvider";
import { useWallet } from "../providers/WalletProvider";

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
    margin-top: 10%;
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NextButton = styled.TouchableOpacity`
    width: 70%;
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
    font-size: 18px;
    font-weight: bold;
`;

export default function ImportWallet({ navigation }) {
    const { web3 } = useWallet();
    const realm = useRealm();
    const [form, setForm] = useState({});
    const [pwHelp, setPwHelp] = useState(false);

    const completeForm = () => {
        if (pwValidate(form.pw)) {
            setPwHelp(true);
            return;
        }
        if (!form.mne) {
            Alert.alert("무효한 니모닉", "니모닉 코드를 확인하세요");
            return;
        }
        if (!ethers.utils.isValidMnemonic(form.mne.trim())) {
            Alert.alert("무효한 니모닉", "니모닉 코드를 확인하세요");
            return;
        }
        const wallet = ethers.Wallet.fromMnemonic(mnes);
        const priv = wallet.privateKey;
        const enc = web3.eth.accounts.encrypt(priv, form.pw);
        realm.write(() => {
            realm.create(TableName, {
                _id: Date.now(),
                nickName: form.nick,
                secureKey: ojbToString(enc),
                pwMD5: ojbToString(md5Encrypt(form.pw)),
            });
        });

        navigation.goBack();
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Header>
                    <Fontisto name="google-wallet" size={50} color="black" />
                    <LogoText>CONNECTING</LogoText>
                </Header>
                <Body>
                    <BodyHeader>
                        <BodyHeaderText>시드를 입력해주세요</BodyHeaderText>
                    </BodyHeader>
                    <BodyContent>
                        <SafeAreaView>
                            <Ti
                                value={form.mne}
                                onChangeText={(txt) =>
                                    setForm({ ...form, mne: txt })
                                }
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
                                    label={form.nick ? null : "nickname"}
                                    style={{ width: 300, padding: 10 }}
                                    onChangeText={(txt) =>
                                        setForm({ ...form, nick: txt })
                                    }
                                ></TextInput>
                                <TextInput
                                    onChangeText={(txt) =>
                                        setForm({ ...form, pw: txt })
                                    }
                                    variant="outlined"
                                    label={form.pw ? null : "password"}
                                    style={{ width: 300, padding: 10 }}
                                    helperText={
                                        pwHelp ? (
                                            <Text style={{ color: "red" }}>
                                                "숫자 6자리를 입력하세요."
                                            </Text>
                                        ) : null
                                    }
                                ></TextInput>
                            </Stack>
                        </UserInfoHeader>
                    </BodyContent>
                    <NextWrapper>
                        <NextButton onPress={() => completeForm()}>
                            <ButtonText>생성</ButtonText>
                        </NextButton>
                    </NextWrapper>
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

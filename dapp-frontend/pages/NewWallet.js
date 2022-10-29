import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput as Ti } from "react-native";
import { useEffect, useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { pwValidate, TableName } from "../utils/userInfo";
import { md5Encrypt, ojbToString } from "../utils/wallet";
import { useWallet } from "../providers/WalletProvider";
import { useRealm } from "../providers/RealmProvider";

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

const MnemonicWrapper = styled.View`
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserWrapper = styled.View`
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: space-around;
`;
const IdWrppaer = styled.View`
    height: 30%;
    width: 80%;
    padding: 10px;
`;

const PwRapper = styled.View`
    height: 30%;
    width: 80%;
    padding-left: 10px;
`;

const NextWrapper = styled.View`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NextButton = styled.TouchableOpacity`
    width: 70%;
    height: 50%;
    background-color: #5e72e4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    color: #ffffff;
`;
const NextButtonText = styled.Text`
    color: #ffffff;
    font-weight: bold;
`;
const MnemonicCon = styled.View`
    width: 100%;
    height: 100%;
`;

export default function NewWallet({ navigation }) {
    const [value, setChangeValue] = useState({});
    const {web3} = useWallet();
    const realm = useRealm();
    const [pwHelp, setPwHelp] = useState(false);
    const [wallet, setWallet] = useState();

    useEffect(() => {
        const wallet = web3.eth.accounts.create(Math.random() * 1000 + '');
        setWallet(wallet);
    }, []);

    const completeForm = () => {

        if (pwValidate(value.pw)) {
            setPwHelp(true);
            return;
        }
        let enc = wallet.encrypt(value.pw);

        realm.write(() => {
            realm.create(TableName, {
                _id: Date.now(),
                nickName: value.nick,
                secureKey: ojbToString(enc),
                pwMD5: ojbToString(md5Encrypt(value.pw)),
            });
        });

        navigation.goBack();
    };

    return (
        <Wrapper>
            <ContentWrapper>
                <Header>
                    <Fontisto name="google-wallet" size={50} color="black" />
                    <LogoText>Wallet</LogoText>
                </Header>
                <Body>
                    <BodyHeader>
                        <BodyHeaderText>
                            개인 키를 안전한 곳에 저장하세요.
                        </BodyHeaderText>
                    </BodyHeader>
                    <MnemonicWrapper>
                        <MnemonicCon>
                            <Button title="복사하기" />
                            <TextInput
                                multiline
                                variant="outlined"
                                defaultValue={wallet?.privateKey}
                                editable={false}
                            />
                        </MnemonicCon>
                    </MnemonicWrapper>
                    <UserWrapper>
                        <PwRapper>
                            <TextInput
                                label={value.nick ? null : "닉네임"}
                                variant="outlined"
                                onChangeText={(text) =>
                                    setChangeValue({ ...value, nick: text })
                                }
                            ></TextInput>
                        </PwRapper>
                        <IdWrppaer>
                            <TextInput
                                label={value.pw ? null : "비밀번호 입력"}
                                variant="outlined"
                                onChangeText={(text) =>
                                    setChangeValue({ ...value, pw: text })
                                }
                                helperText={
                                    pwHelp ? (
                                        <Text style={{ color: "red" }}>
                                            "숫자 6자리를 입력하세요."
                                        </Text>
                                    ) : null
                                }
                                secureTextEntry
                            ></TextInput>
                        </IdWrppaer>
                    </UserWrapper>
                </Body>

                <NextWrapper>
                    <NextButton onPress={() => completeForm()}>
                        <NextButtonText>완료</NextButtonText>
                    </NextButton>
                </NextWrapper>
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

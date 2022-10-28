import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput as Ti } from "react-native";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { Button, TextInput } from "@react-native-material/core";
import { useDB } from "../context";
import { pwValidate, TableName } from "../utils/userInfo";
import { aes256Encrypt, md5Encrypt, ojbToString } from "../utils/wallet";

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

const MainContent = styled.View`
    height: 90%;
    width: 90%;
    border-radius: 10px;
    border-width: 1px;
    border-color: #000000;
    display: flex;
    flex-direction: row;
`;

const UserWrapper = styled.View`
    height: 50%;
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
    width: 80%;
    height: 90%;
    background-color: #5e72e4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    color: #ffffff;
`;
const MnemonicCon = styled.View`
    width: 100%;
    height: 100%;
`;

export default function NewWallet({ navigation }) {
    const [value, setChangeValue] = useState({});
    const [user, setUser] = useState({});
    const { realm, changePassword, password } = useDB();
    const [pwHelp, setPwHelp] = useState(false);
    //console.log("get realm", realm);
    useEffect(() => {
        const createWallet = async () => {
            let randSeed = await ethers.Wallet.createRandom();
            setUser({
                addr: randSeed.address,
                mne: randSeed.mnemonic.phrase,
                priv: randSeed.privateKey,
            });
        };
        createWallet();
    }, []);

    const completeForm = () => {
        //console.log(value);
        if (pwValidate(value.pw)) {
            setPwHelp(true);
            return;
        }
        changePassword(value.pw);
        //console.log(realm.objects("User"));
        //console.log(JSON.stringify(aes256Encrypt(user.priv, value.pw)));
        console.log(md5Encrypt(value.pw));

        realm.write(() => {
            realm.create(TableName, {
                _id: Date.now(),
                nickName: value.nick,
                secureKey: ojbToString(aes256Encrypt(user.priv, value.pw)),
                pwMD5: ojbToString(md5Encrypt(value.pw)),
                address: user.addr,
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
                            니모닉을 안전한 곳에 저장하세요.
                        </BodyHeaderText>
                    </BodyHeader>
                    <MnemonicWrapper>
                        <MnemonicCon>
                            <Button title="복사하기" />
                            <TextInput
                                multiline
                                variant="outlined"
                                defaultValue={user.mne}
                                editable={false}
                            />
                        </MnemonicCon>
                    </MnemonicWrapper>
                    <UserWrapper>
                        <PwRapper>
                            <TextInput
                                label="닉네임"
                                variant="outlined"
                                onChangeText={(text) =>
                                    setChangeValue({ ...value, nick: text })
                                }
                            ></TextInput>
                        </PwRapper>
                        <IdWrppaer>
                            <TextInput
                                label="비밀번호 입력"
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
                            ></TextInput>
                        </IdWrppaer>
                    </UserWrapper>

                    <NextWrapper>
                        <NextButton onPress={() => completeForm()}>
                            <Text>완료</Text>
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

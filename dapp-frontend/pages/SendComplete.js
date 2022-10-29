import styled from "styled-components/native";
import { useWallet } from "../providers/WalletProvider";
import { AntDesign } from "@expo/vector-icons";
import { Button, Divider } from "@react-native-material/core";
import { StyleSheet } from "react-native";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;

const ContentWrapper = styled.View`
    width: 90%;
    height: 90%;
    border-width: 1px;
    border-color: #e1e4e8;
    border-radius: 10px;
    background-color: #f8f9fa;
    padding: 10px;
`;

const ContentHeader = styled.View`
    width: 100%;
    height: 15%;
    flex-direction: row;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 15px;
`;

const ContentHeaderStatusWrapper = styled.View`
    width: 20%;
    height: 40%;
    flex-direction: row;
`;
const ContentHeaderText = styled.Text`
    color: #52bd94;
    font-size: 24px;
`;
const ContentBackButtonWrapper = styled.View`
    width: 80%;
    height: 40%;
    align-items: flex-end;
`;

const ContentBody = styled.View`
    width: 100%;
    height: 50%;
    justify-content: space-evenly;
`;

const ContentInfo = styled.View`
    width: 100%;
    height: 15%;
    flex-direction: row;
`;

const ContentInfoHeader = styled.View`
    width: 30%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const ContentInfoHeaderText = styled.Text`
    color: #525f7f;
    font-size: 18px;
    font-weight: 800;
`;

const ContentInfoContent = styled.View`
    width: 70%;
    height: 100%;
    justify-content: center;
`;
const ContentInfoText = styled.Text`
    color: #525f7f;
    font-size: 18px;
    font-weight: 500;
`;

const ContentFooter = styled.View`
    width: 100%;
    height: 35%;
    padding: 10px;
`;
const ContentFooterHeader = styled.View`
    width: 100%;
    height: 10%;
`;

const ContentFooterHeaderText = styled.Text`
    color: #525f7f;
    font-size: 18px;
    font-weight: 700;
`;

const ContentFooterLog = styled.View`
    width: 100%;
    height: 85%;
`;
const ContentFooterLogText = styled.Text`
    color: #525f7f;
    font-size: 18px;
    font-weight: 500;
`;

export default function SendComplete({ route, navigation }) {
    //const {} = useWallet();
    const { klay, receipt, sendAddress, receiver, fee } = route.params;
    const date = new Date();
    const stringReceipt = JSON.stringify(receipt);
    console.log(route.params);

    return (
        <Wrapper>
            <ContentWrapper style={styles.shadowProp}>
                <ContentHeader>
                    <ContentHeaderStatusWrapper>
                        <AntDesign
                            name="infocirlce"
                            size={24}
                            color="#52BD94"
                        />
                        <ContentHeaderText>{"  "}성공</ContentHeaderText>
                    </ContentHeaderStatusWrapper>
                    <ContentBackButtonWrapper>
                        <Button
                            variant="outlined"
                            color="#52BD94"
                            title="돌아가기"
                            onPress={() => navigation.navigate("Home")}
                        />
                    </ContentBackButtonWrapper>
                </ContentHeader>
                <ContentBody>
                    <ContentInfo>
                        <ContentInfoHeader>
                            <ContentInfoHeaderText>
                                {"-" + klay + "   KLAY"}
                            </ContentInfoHeaderText>
                        </ContentInfoHeader>
                        <ContentInfoContent>
                            <ContentInfoHeaderText>
                                {date.toString().split("GMT")[0]}
                            </ContentInfoHeaderText>
                        </ContentInfoContent>
                    </ContentInfo>
                    <ContentInfo>
                        <ContentInfoHeader>
                            <ContentInfoHeaderText>
                                보내는 사람
                            </ContentInfoHeaderText>
                        </ContentInfoHeader>
                        <ContentInfoContent>
                            <ContentInfoText>{sendAddress}</ContentInfoText>
                        </ContentInfoContent>
                    </ContentInfo>
                    <ContentInfo>
                        <ContentInfoHeader>
                            <ContentInfoHeaderText>
                                받는 사람
                            </ContentInfoHeaderText>
                        </ContentInfoHeader>
                        <ContentInfoContent>
                            <ContentInfoText>{receiver}</ContentInfoText>
                        </ContentInfoContent>
                    </ContentInfo>
                    <ContentInfo>
                        <ContentInfoHeader>
                            <ContentInfoHeaderText>
                                예상 수수료
                            </ContentInfoHeaderText>
                        </ContentInfoHeader>
                        <ContentInfoContent>
                            <ContentInfoText>{fee}</ContentInfoText>
                        </ContentInfoContent>
                    </ContentInfo>
                </ContentBody>
                <Divider style={{ marginTop: 60 }} leadingInset={16} />
                <ContentFooter>
                    <ContentFooterHeader>
                        <ContentFooterHeaderText>
                            활동 로그
                        </ContentFooterHeaderText>
                    </ContentFooterHeader>
                    <ContentFooterLog>
                        <ContentFooterLogText>
                            {stringReceipt}
                        </ContentFooterLogText>
                    </ContentFooterLog>
                </ContentFooter>
            </ContentWrapper>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

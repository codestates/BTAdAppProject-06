//mport { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";
//import { Fontisto } from "@expo/vector-icons";
//import { Text } from "react-native";
import { useEffect, useState } from "react";
import { afterMinute, TableName } from "../utils/userInfo";
import { useRealm } from "../providers/RealmProvider";
const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const WrapperContent = styled.View`
    width: 80%;
    height: 70%;
    display: flex;
    align-items: center;
`;
const QRContentWrapper = styled.View`
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TranInfoWrapper = styled.View`
    width: 90%;
    height: 40%;
    border-radius: 10px;
    border-width: 1px;
    border-color: black;
    display: flex;
    justify-content: space-evenly;
    align-items: center; ;
`;

const InfoContentWrapper = styled.View`
    width: 90%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TranHeaderText = styled.Text`
    font-size: 24px;
    color: #525f7f;
`;

const TranInfoHeaderWrapper = styled.View`
    height: 100%;
    width: 40%;
    justify-content: center;
    align-items: center;
`;
const TranInfoContentWrapper = styled.View`
    width: 60%;
    height: 100%;
    justify-content: center;
`;

const TranInfoHeaderText = styled.Text`
    font-size: 18px;

    font-weight: bold;
    color: #525f7f;
`;
const TranInfoContextText = styled.Text`
    font-size: 14px;
    color: #000000;
`;
const AddressText = styled.Text`
    padding-top: 10px;
    font-size: 8px;
    font-weight: bold;
`;

const HomeButtonWrapper = styled.View`
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HomeButton = styled.TouchableOpacity`
    width: 60%;
    height: 60%;
    background-color: #5e72e4;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ButtonText = styled.Text`
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
`;

export default function PayQR({ navigation, route }) {
    const { payDoc } = route.params;
    //const [pay, setPay] = useState({});
    const realm = useRealm();
    const [address, setAddr] = useState();
    const [qRValue, setQRValue] = useState();
    useEffect(() => {
        const userInfo = realm.objects(TableName)[0];
        setQRValue({ ...payDoc, date: afterMinute(10) });
        setAddr(userInfo.address);
    }, [payDoc]);

    const pop = () => {
        navigation.navigate("Home");
    };

    return (
        <Wrapper>
            <WrapperContent>
                <QRContentWrapper>
                    <QRCode
                        value={JSON.stringify(qRValue)}
                        size={200}
                        backgroundColor="transparent"
                        logoSize={30}
                    />
                    <AddressText>{address}</AddressText>
                </QRContentWrapper>
                <TranInfoWrapper>
                    <InfoContentWrapper>
                        <TranHeaderText>?????? ??????</TranHeaderText>
                    </InfoContentWrapper>
                    <InfoContentWrapper>
                        <TranInfoHeaderWrapper>
                            <TranInfoHeaderText>ID</TranInfoHeaderText>
                        </TranInfoHeaderWrapper>
                        <TranInfoContentWrapper>
                            <TranInfoContextText>
                                {payDoc.uuid}
                            </TranInfoContextText>
                        </TranInfoContentWrapper>
                    </InfoContentWrapper>
                    <InfoContentWrapper>
                        <TranInfoHeaderWrapper>
                            <TranInfoHeaderText>??????</TranInfoHeaderText>
                        </TranInfoHeaderWrapper>
                        <TranInfoContentWrapper>
                            <TranInfoContextText>
                                {payDoc.klayPrice} klaytn
                            </TranInfoContextText>
                        </TranInfoContentWrapper>
                    </InfoContentWrapper>
                    <InfoContentWrapper>
                        <TranInfoHeaderWrapper>
                            <TranInfoHeaderText>????????????</TranInfoHeaderText>
                        </TranInfoHeaderWrapper>
                        <TranInfoContentWrapper>
                            <TranInfoContextText>
                                {qRValue?.date ? qRValue["date"] : null}
                            </TranInfoContextText>
                        </TranInfoContentWrapper>
                    </InfoContentWrapper>
                </TranInfoWrapper>
            </WrapperContent>
            <HomeButtonWrapper>
                <HomeButton
                    onPress={() => {
                        pop();
                    }}
                >
                    <ButtonText>????????????</ButtonText>
                </HomeButton>
            </HomeButtonWrapper>
        </Wrapper>
    );
}

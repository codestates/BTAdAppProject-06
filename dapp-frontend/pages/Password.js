import { KeycodeInput } from "react-native-keycode";
import styled from "styled-components/native";
import { md5Encrypt } from "../utils/wallet";
import { TableName } from "../utils/userInfo";
import { useRealm } from "../providers/RealmProvider";
import { useWallet } from "../providers/WalletProvider";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function Password() {
    const realm = useRealm();
    const { loadAccount } = useWallet();

    const completeForm = (pw) => {
        const userinfo = realm.objects(TableName);
        const objUser = userinfo[0];
        //console.log(objUser);
        const inputMD5 = md5Encrypt(pw)._z;
        const dbMD5 = JSON.parse(objUser["pwMD5"])._z;
        if (inputMD5 === dbMD5) {
            loadAccount(pw);
        }
    };
    return (
        <Wrapper>
            <KeycodeInput
                length={6}
                type="password"
                numeric={true}
                onComplete={(pw) => {
                    completeForm(pw);
                }}
            />
        </Wrapper>
    );
}

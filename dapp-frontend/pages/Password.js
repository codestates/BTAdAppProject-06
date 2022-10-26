import { Text, View } from "react-native";
import { useDB } from "../context";
import { KeycodeInput } from "react-native-keycode";
import styled from "styled-components/native";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function Password({ navigation }) {
    const { realm, changePassword, password } = useDB();
    console.log(password, "right?");
    return (
        <Wrapper>
            <KeycodeInput
                length={6}
                type="password"
                numeric={true}
                onComplete={(value) => {
                    if (value === "123456") {
                        changePassword(value);
                    }
                }}
            />
        </Wrapper>
    );
}

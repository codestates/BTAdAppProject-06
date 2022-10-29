import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
    border-radius: 10px;
    display: flex;
    justify-content: center;
    background-color: #5e72e4;
`;

const ButtonText = styled.Text`
    text-align: center;
    color: #ffffff;
    font-size: 24px;
    line-height: 60px;
`;

export default function CustomButton({ children, ...props }) {
    return (
        <ButtonContainer {...props}>
            <ButtonText>{children}</ButtonText>
        </ButtonContainer>
    )
};
import styled from "styled-components/native";

const Col = styled.View`
    flex: ${({size}) => size || 1};
`;

export default Col;
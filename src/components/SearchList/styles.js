import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    gap: 12px;
    align-items: center;
    margin: 5px 10px;
    background-color: #222227;
    padding: 10px;
    border-radius: 8px;
`;

export const Text = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

export const ImageAvatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;
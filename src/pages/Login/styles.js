import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: #36393F;
`;

export const Content = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

export const Title = styled.Text`
    color: #ffffff;
    font-size: 55px;
    font-weight: bold;
    font-style: italic;
`;

export const Input = styled.TextInput`
    width: 80%;
    background-color: #FFF;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
`;

export const Button = styled.TouchableOpacity`
    width: 80%;
    background-color: #418cfd;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 20px;
`;

export const SignUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`;

export const SignUpText = styled.Text`
    color: #ddd;
    font-size: 15px;
`;

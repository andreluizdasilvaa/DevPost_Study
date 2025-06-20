import React, { useState, useContext } from "react";
import { 
    ActivityIndicator,
    Text 
} from 'react-native';
import {
    Container,
    Content,
    Title,
    Input,
    Button,
    ButtonText,
    SignUpButton,
    SignUpText
} from './styles';
import { AuthContext } from "../../contexts/auth";

export default function Login() {

    const { signUp, signIn, loadingAuth } = useContext(AuthContext)

    const [login, setLogin] = useState(true);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()

    function toggleLogin() {
        setLogin(!login);
        setName('');
        setEmail('');
        setPassword('');
    }

    async function handleSingIn() {
        if(!email || !password) {
            alert('Prencha todos os dados abaixo!')
            return;
        }
        await signIn(email, password)
    }

    async function handleSingUp() {
        if(!name || !email || !password) {
            alert('Prencha todos os dados abaixo!')
            return;
        }
        await signUp(email, password, name)
    }

    if(login) {
        return (
            <Container>
                <Content behavior={'padding'}>
                    <Title>
                        Dev<Text style={{ color: '#E52246' }}>Post</Text>
                    </Title>

                    <Input 
                        placeholder="seuEmail@teste.com"
                        placeholderTextColor='#353840'
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />

                    <Input 
                        placeholder="********"
                        placeholderTextColor='#353840'
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={true}
                    />

                    <Button onPress={handleSingIn} disabled={loadingAuth}>
                        {loadingAuth ? (
                            <ActivityIndicator size="small" />
                        ) : (
                            <ButtonText>Acessar</ButtonText>
                        )}
                    </Button>

                    <SignUpButton onPress={toggleLogin}>
                        <SignUpText>Criar uma conta</SignUpText>
                    </SignUpButton>
                </Content>
            </Container>
        )
    } else {
        return (
            <Container>
                <Content behavior={'padding'}>
                    <Title>
                        Dev<Text style={{ color: '#E52246' }}>Post</Text>
                    </Title>

                    <Input 
                        placeholder="Seu nome"
                        placeholderTextColor='#353840'
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />

                    <Input 
                        placeholder="seuEmail@teste.com"
                        placeholderTextColor='#353840'
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />

                    <Input 
                        placeholder="********"
                        placeholderTextColor='#353840'
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={true}
                    />

                    <Button onPress={handleSingUp} disabled={loadingAuth}>
                        {loadingAuth ? (
                            <ActivityIndicator size="small" />
                        ) : (
                            <ButtonText>Cadastrar</ButtonText>
                        )}
                    </Button>

                    <SignUpButton onPress={toggleLogin}>
                        <SignUpText>Já possuo uma conta</SignUpText>
                    </SignUpButton>
                </Content>
            </Container>
        )
    }
}
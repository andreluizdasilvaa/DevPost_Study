import React, { useState, useLayoutEffect, useContext } from "react";
import {
    Container,
    Input,
    Button,
    ButtonText
} from './styles'
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../contexts/auth";

export default function NewPost() {
    const { user } = useContext(AuthContext)
    const [post, setPost] = useState("");
    const navigation = useNavigation();

    // useLayoutEffect: o component só aparece quando isso terminar de carregar
    useLayoutEffect(() => {
        
        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => handlePost()}>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })

    }, [navigation, post])

    async function handlePost() {
        if(post == "") {
            alert('Seu post contem conteudo invalido');
            return;
        }

        let avatarUrl = null;

        try {
            
            let response = await (await firestore().collection('users').doc(user.uid).get()).data()
            if(response.avatarUrl) {
                avatarUrl = response.avatarUrl;
            }
        } catch (error) {
            console.log(error);
            avatarUrl = null;
        }
        
        await firestore().collection('posts').add({
            createAt: new Date(),
            content: post,
            autor: user?.nome,
            userId: user?.uid,
            likes: 0,
            avatarUrl
        })
        .then(() => {
            setPost('')
            console.log('POST CRIADO COM SUCESSO')
        })
        .catch((error) => {
            console.log('ERR AO CRIAR O POST', error);
        })
    }

    return (
        <Container>
            <Input 
                placeholder="O que está acontecendo?"
                value={post}
                onChangeText={(e) => setPost(e)}
                autoCorrect={false}
                multiline={true}
                placeholderTextColor='#ddd'
                maxLength={300}
            />
        </Container>
    )
}
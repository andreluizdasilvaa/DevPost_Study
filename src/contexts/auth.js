import React, { useState, createContext, useEffect } from "react";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function loadStorage() {  
            const storageUser = await AsyncStorage.getItem('@devapp');

            if(storageUser) {
               setUser(JSON.parse(storageUser));
               setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    }, []);

    async function signUp(email, password, name) {
        console.log('Cheguei')
        setLoadingAuth(true);
        // Cria um novo usuário com e-mail e senha usando o Firebase Auth
        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            // Obtém o UID (ID único) do usuário recém-criado
            let uid = value.user.uid;

            // Acessa a coleção 'users' no Firestore e cria um documento com o UID como ID
            await firestore().collection('users')
            .doc(uid).set({
                // Define o campo 'name' com o nome passado como parâmetro
                name: name,
                // Define o campo 'createAt' com a data e hora atual
                createAt: new Date(),
            })
            .then(() => {
                // Se o documento for criado com sucesso, monta um objeto com os dados do usuário
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                }

                // Armazena os dados do usuário no estado local
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch((e) => {
                // Em caso de erro ao gravar no Firestore, exibe o erro no console
                console.log('Error: ', e)
                setLoadingAuth(false);
            })
        })
        .catch((error) => {
            console.log('Erro ao criar usuário no Auth:', error);
            setLoadingAuth(false);
        });

    }

    async function signIn(email, password) {
        setLoadingAuth(true);
        await auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().name,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            console.log(user);
            setLoadingAuth(false);
        })
        .catch((error) => {
            console.log('Error: ', error);
            setLoadingAuth(false);
        })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@devapp', JSON.stringify(data));
    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    }

    return (
        <AuthContext.Provider value={{ 
                signed: !!user, 
                signUp, 
                signIn, 
                signOut, 
                user, 
                loadingAuth, 
                loading,
                setUser,
                storageUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
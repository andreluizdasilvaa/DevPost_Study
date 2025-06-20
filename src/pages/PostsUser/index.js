import React, { useLayoutEffect, useState, useCallback, useContext } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../contexts/auth";

import PostsList from "../../components/PostList";

import {
    Container,
    setPosts
} from './styles'
import { ListPost } from "../Home/styles";

export default function PostsUser() {
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const navigate = useNavigation();

    const [title, setTitle] = useState(route.params?.title);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        navigate.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigate, title]);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            firestore()
            .collection('posts')
            .where('userId', '==', route.params?.userId)
            .orderBy('createAt', 'desc')
            .get()
            .then((snapshot) => {
                const postList = [];

                snapshot.docs.forEach((u) => {
                    postList.push({
                        ...u.data(),
                        id: u.id
                    });
                });

                if (isActive) {
                    setPosts(postList);
                    console.log(postList);
                    setLoading(false);
                }
            });

            return () => {
                isActive = false;
            };
        }, [route.params?.userId])
    );

    return (
        <Container>
            { loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="#E52246" />
                </View>
            ) : (
                <ListPost 
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <PostsList data={item} userId={user?.uid} />
                    )}
                />
            )}
        </Container>
    )
}

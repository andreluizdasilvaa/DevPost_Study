import React, { useCallback, useState, useContext} from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
    Container,
    ButtonPost,
    ListPost
} from './styles'
import Header from '../../components/Header';
import PostList from '../../components/PostList';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../contexts/auth';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);

  const [loadingRefresh, setloadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fecthPosts() {
          setLoading(true);
          firestore().collection('posts')
          .orderBy('createAt', 'desc')
          .limit(5)
          .get()
          .then((snapshot) => {
            
            if(isActive) {
              setPosts([]);
              const postsList = [];

              snapshot.docs.map( (u) => {
                postsList.push({
                  ...u.data(),
                  id: u.id,
                })
              })

              setPosts(postsList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1])
              setEmptyList(!!snapshot.empty)
              console.log('snapshot: ', snapshot)
              setLoading(false);
            }
          })
      }

      fecthPosts();

      return () => {
        isActive = false;
      }

    }, [])
  )

  // Buscar mais posts ao puxar a lista para cima
  async function handleRefreshPosts() {
      setloadingRefresh(true);

      setLoading(true);
      firestore().collection('posts')
      .orderBy('createAt', 'desc')
      .limit(5)
      .get()
      .then((snapshot) => {
        
        setPosts([]);
        const postsList = [];

        snapshot.docs.map( (u) => {
          postsList.push({
            ...u.data(),
            id: u.id,
          })
        })

        setPosts(postsList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1])
        setEmptyList(!!snapshot.empty)
        setLoading(false);
      })
      setloadingRefresh(false);
  }

  // Buscar mais posts ao cheagar ao final da lista
  function getListPost() {
    if(emptyList) {
      // se buscou toda sua lista tiramos o loadind.
      setLoading(false);
      return null;
    }

    if(loading) return;

    firestore().collection('posts')
    .orderBy('createAt', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then( ( snapshot ) => {
      const postList = [];

      snapshot.docs.map( u => {
        postList.push({
          ...u.data(),
          id: u.id,
        })
      })

      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length - 1])
      setPosts(oldPosts => [...oldPosts, ...postList])
      setLoading(false);
      
    })
  }

  return (
    <Container>
      <Header />

      { loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f1f1' }}>
          <ActivityIndicator size='large' color='#e52246' />
        </View>
      ) : (
        <ListPost 
            data={posts}
            keyExtractor={ item => item.id }
            showsVerticalScrollIndicator={false}
            renderItem={ ({ item }) => (
              <PostList data={item} userId={user?.uid}/>
            )}

            refreshing={loadingRefresh}
            onRefresh={handleRefreshPosts}
            onEndReached={() => getListPost()}
            onEndReachedThreshold={0.1}

        />
      )}


      <ButtonPost activeOpacity={0.8} onPress={() => navigation.navigate("NewPost")}>
        <Feather 
            name="edit-2"
            color="#fff"
            size={25}
        />
      </ButtonPost>

    </Container>
  );
}

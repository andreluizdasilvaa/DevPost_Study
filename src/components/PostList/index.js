import React, { useState } from 'react';
import { 
  Container, 
  Name, 
  Header, 
  Avatar, 
  ContentView, 
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost
} from './styles'

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

function PostsList({ data, userId }){
    const navigate = useNavigation();
    const [likePost, setLikePost] = useState(data?.likes)

  // essa função é para curtir e descurtir um post
  async function handleLikePost(id, likes){
    // aqui criamos um id, de junta o id da pessoa logada( pessoa que vai curtir ) e id do post que elá vai curtir
    const docId = `${userId}_${id}`;

    // Verifica se na collection 'likes' já tem algum like com esse id
    const doc = await firestore().collection('likes')
    .doc(docId).get();

    // Se tiver algum like com esse id, dentro desse if devemos remove-lo de like, e diminuir ( -1 ) like na collection de 'posts' e visualmente tmb :)
    if(doc._exists){
      //Que dizer que já curtiu esse post, entao precisamos remover o like
      await firestore().collection('posts')
      .doc(id).update({
        likes: firestore.FieldValue.increment(-1)
      })

      await firestore().collection('likes').doc(docId)
      .delete()
      .then(() => {
        setLikePost(likes - 1)
      })
      return;
    }

    // se não tiver nenhum documento com o id que criamos antes( "docId" ), devemos criar um like.

    // Cria um documento de like na tabela de like, com o docId como chave
    await firestore().collection('likes')
    .doc(docId).set({
      postId: id,
      userId: userId
    })

    // Incrementa a quantidade de like no post e setLikePost para ter resposta visual imediata :)
    await firestore().collection('posts')
    .doc(id).update({
      likes: firestore.FieldValue.increment(1)
    })
    .then(()=>{
      setLikePost(likes + 1)
    })
  }

  function formatTimePost(){
    // console.log(new Date(data.created.seconds * 1000));
    const datePost = new Date(data.createAt.seconds * 1000);

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  return(
    <Container>
      <Header onPress={() => navigate.navigate("PostsUser", { title: data.autor, userId: data.userId } )}>
        {data.avatarUrl ? (
          <Avatar
            source={{ uri: data.avatarUrl }}
          />
        ) : (
          <Avatar
            source={require('../../assets/avatar.png')}
          />
        )}
        <Name numberOfLines={1}>
          {data?.autor}
        </Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={ () => handleLikePost(data.id, likePost) }>
          <Like>
            {likePost === 0 ? '' : likePost}
          </Like>
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />
        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>


    </Container>
  )
}

export default PostsList;
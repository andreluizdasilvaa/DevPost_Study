import React from 'react';
import { Container, Text, ImageAvatar } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function SearchList({ data }) {
  const navigate = useNavigation();
  console.log(data);
  return (
    // Como a tela que queremos navegar está dentro de stack, e essa tela está dentro de tab, precisamos entrar no tab 'HomeTab' que ele recebe todas as telas stack, e depois navegar para a tela que queremos, pois a screen Search, ela está isolada dentro do navigator tab.
    <Container
      onPress={() =>
        navigate.navigate('HomeTab', {
          screen: 'PostsUser',
          params: { title: data.name, userId: data.id },
        })
      }
    >
      {data.avatarUrl ? (
        <ImageAvatar source={{ uri: data.avatarUrl }} />
      ) : (
        <ImageAvatar source={require('../../assets/avatar.png')} />
      )}
      <Text>{data.name}</Text>
    </Container>
  );
}

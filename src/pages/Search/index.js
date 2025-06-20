import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Container, AreaInput, Input, List } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import SearchList from '../../components/SearchList';

import firestore from '@react-native-firebase/firestore';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }

    const subscriber = firestore()
      .collection('users')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .onSnapshot(
        snapshot => {
          const listUsers = [];
          if (snapshot && typeof snapshot.forEach === 'function') {
            snapshot.forEach(doc => {
              listUsers.push({
                ...doc.data(),
                id: doc.id,
              });
            });
          }
          setUsers(listUsers);
        },
        error => {
          console.log('Erro ao buscar usuários:', error);
          setUsers([]);
        },
      );

    return () => subscriber();
  }, [input]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AreaInput>
          <Feather name="search" size={20} color="#E52246" />
          <Input
            placeholder="Procurando alguem?"
            value={input}
            onChangeText={e => setInput(e)}
            placeholderTextColor="#353840"
          />
        </AreaInput>

        <List
          data={users}
          renderItem={({ item }) => <SearchList data={item} />}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}

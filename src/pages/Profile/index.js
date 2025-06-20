import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';
import { Modal, Platform } from 'react-native';

export default function Profile() {
  const { signOut, user, setUser, storageUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  async function updateProfile() {
    if (nome === '') {
      return;
    }

    await firestore().collection('users').doc(user?.uid).update({
      name: nome,
    });

    // Buscar todos posts desse user e atualizar o nome dele
    const postsDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user?.uid)
      .get();

    postsDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: nome,
      });
    });

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  async function uploadPhoto() {
    const config = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(config, response => {
      if (response.didCancel) {
        console.log('Cancelou');
      } else if (response.errorCode) {
        console.log('ops parece que deu algum erro!');
      } else {
        uploadFileToCloudinary(response);
      }
    });
  }

    async function uploadFileToCloudinary(response) {
        const file = response.assets[0];

        const data = new FormData();
        data.append('file', {
            uri: file.uri,
            type: file.type,
            name: user?.uid,
        });
        data.append('upload_preset', 'profile_devpost'); // unsigned preset

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/<SEU_NOME_NUVEM>/image/upload', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();
            if (result.secure_url) {
                setUrl(result.secure_url);
                // atualiza a foto na collection 'users'
                await firestore().collection('users').doc(user.uid).update({
                    avatarUrl: result.secure_url,
                });

                // atualiza a foto de todas as postagens do user
                const postsDocs = await firestore()
                  .collection('posts')
                  .where('userId', '==', user.uid)
                  .get();

                const updatePosts = postsDocs.docs.map(doc =>
                  firestore().collection('posts').doc(doc.id).update({
                    avatarUrl: result.secure_url,
                  })
                );
                await Promise.all(updatePosts);
            } else {
                console.log('Erro no retorno do Cloudinary', result);
            }
        } catch (err) {
            console.error('Erro no upload', err);
        }
    }

  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={() => uploadPhoto()}>
          <UploadText>+</UploadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadPhoto()}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#ffffff">Atualizar Nome</ButtonText>
      </Button>

      <Button bg="#ffffff" onPress={signOut}>
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder="Digite seu novo nome"
            value={nome}
            onChangeText={e => setNome(e)}
          />

          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#ffffff">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

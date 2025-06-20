# DevPost

Este é um projeto [**React Native**](https://reactnative.dev) criado com [`@react-native-community/cli`](https://github.com/react-native-community/cli), que simula uma rede social de posts para desenvolvedores. O app permite criar, curtir, buscar e atualizar posts, além de gerenciar perfis de usuário com foto e nome.

---

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dicas e Troubleshooting](#dicas-e-troubleshooting)
- [Saiba Mais](#saiba-mais)

---

## Tecnologias Utilizadas

- **React Native**: Framework principal para desenvolvimento mobile multiplataforma.
- **React Native CLI**: Ferramenta oficial para inicialização e gerenciamento do projeto.
- **Firebase**:
  - **Authentication**: Gerenciamento de login/cadastro de usuários.
  - **Firestore**: Banco de dados NoSQL em tempo real para armazenar posts, usuários e likes.
- **Cloudinary**: Serviço de armazenamento e CDN para upload e gerenciamento de imagens de perfil dos usuários.
- **AsyncStorage**: Armazenamento local para persistência de dados do usuário autenticado.
- **React Navigation**: Navegação entre telas (Stack e Tab Navigators).
- **Styled Components**: Estilização dos componentes React Native.
- **react-native-image-picker**: Seleção de imagens da galeria do dispositivo.
- **date-fns**: Manipulação e formatação de datas.

---

## Funcionalidades

- **Autenticação de Usuário** (login/cadastro)
- **Criação de Posts** com texto e avatar do usuário
- **Listagem de Posts** com paginação e atualização em tempo real
- **Curtir/Descurtir Posts**
- **Busca de Usuários**
- **Perfil do Usuário**: atualização de nome e foto de perfil (upload para Cloudinary)
- **Persistência de Sessão** com AsyncStorage
- **Atualização automática do nome/avatar em todos os posts do usuário**

---

## Configuração do Ambiente

Antes de começar, siga o guia oficial de [Configuração do Ambiente React Native](https://reactnative.dev/docs/environment-setup) para instalar Node.js, JDK, Android Studio, Xcode (Mac), etc.

**Dependências externas necessárias:**
- Conta no [Firebase](https://firebase.google.com/)
- Conta no [Cloudinary](https://cloudinary.com/)

---

## Como Rodar o Projeto

### 1. Instale as dependências

```sh
npm install
# ou
yarn install
```

### 2. Configure o Firebase

- Crie um projeto no Firebase.
- Ative Authentication (Email/Senha) e Firestore Database.
- Baixe o arquivo `google-services.json` (Android) 
- Atualize as configurações do Firebase no projeto conforme necessário.

### 3. Configure o Cloudinary

- Crie uma conta no Cloudinary.
- Crie um upload preset (unsigned) chamado `profile_devpost`.
- Atualize a URL de upload no código se necessário.

### 4. Inicie o Metro Bundler

```sh
npm start
# ou
yarn start
```

### 5. Rode o app

#### Android

```sh
npm run android
# ou
yarn android
```

---

## Estrutura do Projeto

```
src/
  components/      # Componentes reutilizáveis (PostList, SearchList, Header, etc)
  contexts/        # Contextos globais (ex: AuthContext)
  pages/           # Telas principais (Home, Login, Profile, NewPost, Search, PostsUser)
  assets/          # Imagens e recursos estáticos
  routes/          # Configuração de navegação
  ...
```

- **App.js**: Ponto de entrada do app, configura navegação e contexto de autenticação.
- **src/contexts/auth.js**: Lógica de autenticação, persistência e contexto global do usuário.
- **src/pages/**: Telas do app, cada uma com sua lógica e estilização.
- **src/components/**: Componentes visuais reutilizáveis.

---

## Dicas e Troubleshooting

- Para recarregar o app:
  - **Android**: Pressione <kbd>R</kbd> duas vezes ou <kbd>Ctrl</kbd>+<kbd>M</kbd> e selecione "Reload".
  - **iOS**: Pressione <kbd>R</kbd> no simulador.
- Se tiver problemas, consulte a [documentação oficial de troubleshooting](https://reactnative.dev/docs/troubleshooting).

---

## Saiba Mais

- [React Native Website](https://reactnative.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)
- [date-fns](https://date-fns.org/)

---

Projeto desenvolvido para fins de estudo.

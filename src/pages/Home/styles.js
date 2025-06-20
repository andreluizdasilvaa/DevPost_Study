import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

// Essa syntax para usar o SafeAreaView da lib correta( react-native-safe-area-context )
export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #36393f;
`;

export const ButtonPost = styled.TouchableOpacity`
    position: absolute;
    bottom: 5%;
    right: 6%;
    height: 60px;
    width: 60px;
    background-color: #202225;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const ListPost = styled.FlatList`
    flex: 1;
    background-color: #f1f1f1;
`;
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView,ImageBackground } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function({ navigation }) {
    return (
        <ImageBackground source={require('../assets/FundoJogos.png')} style={styles.container}>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 70, // Tamanho da fonte
        fontWeight: 'bold', // Destaca o texto
        textAlign: 'center', // Centraliza o texto
        color: '#000', // Cor do texto (preto)
    },
});

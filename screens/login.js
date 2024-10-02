import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image,StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {

const navigation = useNavigation();


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tafuncionando, setTafuncionando] = useState('');


  const stringToObjt = async () => {
    let listaDeRegistro = await AsyncStorage.getItem('registroStorage');
    listaDeRegistro = JSON.parse(listaDeRegistro) || []; // Se não existir nada, inicia um array vazio
    return listaDeRegistro;
  };

  const buscarRegistro = async (email, senha) => {

    let listaDeRegistro = await stringToObjt();

    const registroEncontrado = listaDeRegistro.find(
      element => element.Email == email && element.Senha == senha
    );

    

    if (registroEncontrado) {
        console.log(JSON.stringify(registroEncontrado));
        

        await AsyncStorage.setItem('contaUtilizada', JSON.stringify(registroEncontrado))
        navigation.navigate('Main')  
    } else {
      Alert.alert('O Email ou Senha utilizado está incorreto!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/LogoAlphalogic.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
      />
      <TouchableOpacity onPress={() =>  navigation.navigate('Register')  }>
        <Text style={styles.forgotText}>Cadastre-se</Text>
      </TouchableOpacity>

      {/* Corrigir a chamada de buscarRegistro */}
      <TouchableOpacity style={styles.button} onPress={() => buscarRegistro(email, senha)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b6e4ff', // Cor de fundo solicitada
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 180,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
  },
  forgotText: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;

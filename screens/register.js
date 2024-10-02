import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CadastroForm = () => {
  const navigation = useNavigation();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [relacaoCrianca, setRelacaoCrianca] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [idade, setIdade] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Habilita o botão somente se o email e a senha estiverem preenchidos
    setIsButtonEnabled(email.length > 0 && senha.length > 0);
  }, [email, senha]);

  const showDateSelector = () => {
    setShowDatePicker(true);
  };

  const stringToObjt = async () => {
    let listaDeRegistro = await AsyncStorage.getItem('registroStorage');
    listaDeRegistro = JSON.parse(listaDeRegistro) || [];
    return listaDeRegistro;
  };

  const adicionarCadastro = async () => {
    const data = {
      Nome: nomeCompleto,
      DataNasc: dataNascimento,
      RelacaoCrianca: relacaoCrianca,
      Email: email,
      Senha: senha,
      Telefone: telefone,
      NomeCrianca: nomeCrianca,
      DataNascCrianca: idade,
      Diagnostico: diagnostico,
    };

    try {
      let listaDeRegistro = await stringToObjt();
      listaDeRegistro.push(data);
      await AsyncStorage.setItem('registroStorage', JSON.stringify(listaDeRegistro));
      navigation.navigate('Login')    
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#b6e4ff" />
      <View style={styles.container}>
        <Text style={styles.header}>Cadastro</Text>
        <Text style={styles.subtitle}>Vamos realizar seu cadastro, precisamos apenas de algumas informações:</Text>

        <Text style={styles.sectionTitle}>Informações pessoais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <TouchableOpacity onPress={showDateSelector}>
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento"
            value={dataNascimento.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dataNascimento}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDataNascimento(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Relação com a criança"
          value={relacaoCrianca}
          onChangeText={setRelacaoCrianca}
        />

        <Text style={styles.sectionTitle}>Informações de contato</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.sectionTitle}>Informações da criança</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Criança"
          value={nomeCrianca}
          onChangeText={setNomeCrianca}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput
          style={styles.input}
          placeholder="Diagnóstico"
          value={diagnostico}
          onChangeText={setDiagnostico}
        />

        <TouchableOpacity
          style={[styles.button, !isButtonEnabled && { backgroundColor: '#ccc' }]}
          onPress={adicionarCadastro}
          disabled={!isButtonEnabled} // Desabilita o botão se o email ou a senha estiverem vazios
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CadastroForm;

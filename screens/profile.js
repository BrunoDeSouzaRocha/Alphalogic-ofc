import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, ImageBackground, View, TextInput, ScrollView, Platform, StatusBar as ExpoStatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({ navigation }) {
  const [accountData, setAccountData] = useState({
    Nome: '',
    DataNasc: '',
    RelacaoCrianca: '',
    Email: '',
    Senha: '',
    Telefone: '',
    NomeCrianca: '',
    DataNascCrianca: '',
    Diagnostico: ''
  });

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('contaUtilizada');
        const account = JSON.parse(storedData) || {};
        
        // Formatando datas para o padrão pt-BR
        if (account.DataNasc) {
          account.DataNasc = new Date(account.DataNasc).toLocaleDateString('pt-BR');
        }
        if (account.DataNascCrianca) {
          account.DataNascCrianca = new Date(account.DataNascCrianca).toLocaleDateString('pt-BR');
        }
  
        setAccountData(account);
      } catch (error) {
        console.error('Erro ao carregar os dados da conta:', error);
      }
    };
  
    loadAccountData();
  }, []);

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Resumo Emocional do Mês</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Emoções</Text>
            <View style={styles.emotionalSummary}>
              <View style={styles.emotionItem}><Text style={styles.emotionLabel}>Feliz:</Text><Text style={styles.emotionValue}>15%</Text></View>
              <View style={styles.emotionItem}><Text style={styles.emotionLabel}>Tranquilo:</Text><Text style={styles.emotionValue}>25%</Text></View>
              <View style={styles.emotionItem}><Text style={styles.emotionLabel}>Triste:</Text><Text style={styles.emotionValue}>25%</Text></View>
              <View style={styles.emotionItem}><Text style={styles.emotionLabel}>Irritado:</Text><Text style={styles.emotionValue}>35%</Text></View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Padrões Emocionais</Text>
            <Text style={styles.paragraph}>
              Notamos que a criança exibe maior felicidade e relaxamento durante atividades criativas, como pintura e modelagem com massinha.
              Durante essas atividades, ela sorri mais, fica mais falante e parece mais à vontade.
              Esse padrão foi observado repetidamente, sugerindo que atividades criativas são uma importante fonte de prazer e bem-estar para ela.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Relacionamentos</Text>
            <Text style={styles.paragraph}>Conforto em pequenos grupos: 50%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '50%' }]} />
            </View>
          </View>

          <View style={styles.infoContainer}>
            {renderInput('Nome', accountData.Nome)}
            {renderInput('Data de Nascimento', accountData.DataNasc)}
            {renderInput('Relação com a Criança', accountData.RelacaoCrianca)}
            {renderInput('Email', accountData.Email)}
            {renderInput('Telefone', accountData.Telefone)}
            {renderInput('Nome da Criança', accountData.NomeCrianca)}
            {renderInput('Data de Nascimento da Criança', accountData.DataNascCrianca)}
            {renderInput('Diagnóstico', accountData.Diagnostico)}
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );

  function renderInput(label, value) {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}:</Text>
        <TextInput style={styles.input} value={value} editable={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? ExpoStatusBar.currentHeight : 0,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5A67D8',
  },
  emotionalSummary: {
    marginBottom: 15,
  },
  emotionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  emotionLabel: {
    fontSize: 16,
    color: '#333',
  },
  emotionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    backgroundColor: '#48BB78',
    height: '100%',
  },
  infoContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#f7f7f7',
    color: '#333',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
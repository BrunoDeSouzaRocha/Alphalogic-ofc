import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = () => {
  const [selectedEmoji, setSelectedEmoji] = useState({}); // Estado para armazenar o emoji selecionado por atividade
  const [anotacoesHoje, setAnotacoesHoje] = useState([]); // Estado para armazenar as anotações do dia
  const [realizado, setRealizado] = useState({}); // Estado para armazenar se a atividade foi realizada
  const navigation = useNavigation(); // Navegação

  const emojis = ['😃', '😐', '☹️', '😡']; // Emojis de reação

  // Função para selecionar emoji para uma atividade específica
  const selectEmoji = (id, emoji) => {
    const newSelectedEmoji = { ...selectedEmoji, [id]: emoji };
    setSelectedEmoji(newSelectedEmoji);
    saveEmojiToStorage(id, emoji);
  };

  // Função para selecionar se a atividade foi realizada
  const selectRealizado = (id, status) => {
    const newRealizado = { ...realizado, [id]: status };
    setRealizado(newRealizado);
    saveRealizadoToStorage(id, status);
  };

  // Carregar as anotações do AsyncStorage
  const recarregaInformacao = async () => {
    try {
      const accountData = await AsyncStorage.getItem('contaUtilizada');
      const account = JSON.parse(accountData);
      const email = account.Email;
      const storedReminders = await AsyncStorage.getItem(`reminders_${email}`);

      if (storedReminders) {
        const parsedReminders = JSON.parse(storedReminders);
        dataAtual(parsedReminders);
      }
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    }
  };

  // Função para salvar o emoji no AsyncStorage
  const saveEmojiToStorage = async (id, emoji) => {
    try {
      await AsyncStorage.setItem(`emoji_${id}`, emoji);
    } catch (error) {
      console.error('Erro ao salvar emoji:', error);
    }
  };

  // Função para salvar se a atividade foi realizada no AsyncStorage
  const saveRealizadoToStorage = async (id, status) => {
    try {
      await AsyncStorage.setItem(`realizado_${id}`, status ? 'sim' : 'não');
    } catch (error) {
      console.error('Erro ao salvar realizado:', error);
    }
  };

  // Carregar os estados de emoji e realizado do AsyncStorage
  const loadFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      const emojiState = {};
      const realizadoState = {};

      result.forEach(([key, value]) => {
        if (key.startsWith('emoji_')) {
          const id = key.replace('emoji_', '');
          emojiState[id] = value;
        } else if (key.startsWith('realizado_')) {
          const id = key.replace('realizado_', '');
          realizadoState[id] = value === 'sim';
        }
      });

      setSelectedEmoji(emojiState);
      setRealizado(realizadoState);
    } catch (error) {
      console.error('Erro ao carregar dados do AsyncStorage:', error);
    }
  };

  // Função para atualizar os lembretes de hoje
  const dataAtual = (todasAnotacoes) => {
    const today = moment().format('YYYY-MM-DD');
    const todayRemindersList = todasAnotacoes[today] || [];
    setAnotacoesHoje(todayRemindersList);
  };

  // Carregar as informações ao focar na tela
  useFocusEffect(
    useCallback(() => {
      recarregaInformacao();
      loadFromStorage();
      return () => {};
    }, [])
  );

  // Renderização da interface
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item.title}</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => selectRealizado(item.id, true)}>
          <Text style={[styles.checkbox, realizado[item.id] ? styles.checked : null]}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectRealizado(item.id, false)}>
          <Text style={[styles.checkbox, !realizado[item.id] ? styles.checked : null]}>Não</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emojiContainer}>
        {emojis.map((emoji) => (
          <TouchableOpacity key={emoji} onPress={() => selectEmoji(item.id, emoji)}>
            <Text style={selectedEmoji[item.id] === emoji ? styles.selectedEmoji : styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={anotacoesHoje}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: 'green',
    color: 'white',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emoji: {
    fontSize: 24,
  },
  selectedEmoji: {
    fontSize: 24,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default HomeScreen;

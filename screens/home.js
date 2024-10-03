import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa o locale para PT-BR
import { useFocusEffect } from '@react-navigation/native'; // para navegação

const HomeScreen = ({ navigation }) => {
  const [selectedEmojis, setSelectedEmojis] = useState({}); // Estado para armazenar emojis selecionados por lembrete
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reminders, setReminders] = useState({});
  const [todayReminders, setTodayReminders] = useState([]);
  const [selectedOption, setSelectedOption] = useState({}); // Modificado para um objeto de opções

  const handleSelectOption = (reminderIndex, option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [reminderIndex]: option,
    }));
  };

  const emojis = ['😃', '😐', '☹️', '😡'];

  // Função para alterar o emoji selecionado
  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const selectEmojis = (reminderIndex, emojiIndex) => {
    setSelectedEmojis((prev) => ({
      ...prev,
      [reminderIndex]: emojiIndex, // Atualiza o emoji selecionado para o lembrete correspondente
    }));
  };

  // Carregar lembretes do AsyncStorage
  const loadReminders = async () => {
    try {
      const accountData = await AsyncStorage.getItem('contaUtilizada');
      const account = JSON.parse(accountData);
      const email = account.Email;
      const storedReminders = await AsyncStorage.getItem(`reminders_${email}`);
      if (storedReminders) {
        const parsedReminders = JSON.parse(storedReminders);
        console.log(accountData);
                
        setReminders(parsedReminders);
        updateTodayReminders(parsedReminders);
      }
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    }
  };

  // Atualizar lembretes de hoje
  const updateTodayReminders = (allReminders) => {
    const today = moment().format('YYYY-MM-DD');
    const todayRemindersList = allReminders[today] || [];
    setTodayReminders(todayRemindersList);
  };

  useFocusEffect(
    useCallback(() => {
      loadReminders(); // Carrega os lembretes sempre que a tela é exibida

      return () => {
        // Função de limpeza (se necessário) quando o componente perde o foco
      };
    }, [])
  );

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c67b6" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sessão de emojis */}
        <View style={styles.emojiContainer}>
          <View style={styles.selectedEmojiContainer}>
            <Text style={styles.selectedEmoji}>{selectedEmoji || ''}</Text>
          </View>
          <Text style={styles.emojiQuestion}>Como você se sente hoje?</Text>
          <View style={styles.emojiButtonsContainer}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity key={index} onPress={() => selectEmoji(emoji)} style={styles.emojiButtonStyle}>
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sessão de Agenda do dia */}
        <View style={styles.dailyAgendaContainer}>
          <Text style={styles.sectionTitle}>Agenda do dia</Text>
          <View style={styles.reminderList}>
            {todayReminders.length > 0 ? (
              todayReminders.map((reminder, reminderIndex) => (
                <View key={reminderIndex} style={styles.reminderItem}>
                  <View style={styles.reminderHeader}>
                  </View>
                  <Text style={styles.reminderText}>{reminder}</Text>

                  {/* Adicionando a seleção de emojis para cada lembrete */}
                  <View style={styles.emojiContainerAgenda}>
                    {emojis.map((emoji, emojiIndex) => (
                      <TouchableOpacity
                        key={emojiIndex}
                        onPress={() => selectEmojis(reminderIndex, emojiIndex)}
                        style={[
                          styles.emojiButton,
                          selectedEmojis[reminderIndex] === emojiIndex && styles.selectedEmojiButton, // Aplica estilo de destaque se o emoji foi selecionado
                        ]}
                      >
                        <Text style={styles.emoji}>{emoji}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Adicionando caixas de seleção para "Atividade realizada?" */}
                  <Text style={styles.activityQuestion}>Atividade realizada?</Text>
                  <View style={styles.checkBoxContainer}>
                    <TouchableOpacity
                      onPress={() => handleSelectOption(reminderIndex, 'sim')}
                      style={[
                        styles.button,
                        selectedOption[reminderIndex] === 'sim' && styles.buttonSelectedSim,
                      ]}
                    >
                      <Text style={styles.text}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSelectOption(reminderIndex, 'não')}
                      style={[
                        styles.button,
                        selectedOption[reminderIndex] === 'não' && styles.buttonSelectedNao,
                      ]}
                    >
                      <Text style={styles.text}>Não</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noRemindersText}>Você não tem lembretes para hoje.</Text>
            )}
          </View>
        </View>

        {/* Sessão de Atividades Recentes */}
        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <View style={styles.activities}>
            <TouchableOpacity style={styles.activity} onPress={() => { navigation.navigate('Terapia Ocupacional') }}>
              <Image source={require('../assets/AtividadesRecentes/ImgTerapiaOCUPACIONAL.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>Terapia Ocupacional</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activity} onPress={() => { }}>
              <Image source={require('../assets/AtividadesRecentes/ImgFONODIOLOGIA.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>Fonoaudiologia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activity} onPress={() => { /* Função futura */ }}>
              <Image source={require('../assets/AtividadesRecentes/ImgPISCOLOGO.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>Psicólogo(a)</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => { navigation.navigate('ATIVIDADES REALIZADAS') }}>
            <Text style={styles.viewMoreText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10, // Diminui de 12 para 10
    margin: 8, // Diminui de 10 para 8
    width: 120, // Diminui de 130 para 120
    alignItems: 'center',
    borderRadius: 15, // Diminui de 20 para 15
    backgroundColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 4 para 3
    elevation: 2, // Diminui de 3 para 2
  },
  buttonSelectedSim: {
    backgroundColor: '#66BB6A',
  },
  buttonSelectedNao: {
    backgroundColor: '#FF8A80',
    borderColor: '#D32F2F',
  },
  text: {
    fontSize: 16, // Diminui de 18 para 16
    color: '#000',
  },
  scrollContainer: {
    paddingVertical: 15, // Diminui de 20 para 15
  },
  emojiContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20, // Diminui de 25 para 20
    borderRadius: 20, // Diminui de 25 para 20
    marginHorizontal: 15, // Diminui de 20 para 15
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 5 para 3
    elevation: 3, // Diminui de 4 para 3
  },
  emojiContainerAgenda: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 6, // Diminui de 8 para 6
  },
  selectedEmojiContainer: {
    backgroundColor: '#E0E0E0',
    width: 70, // Diminui de 80 para 70
    height: 70, // Diminui de 80 para 70
    borderRadius: 35, // Diminui de 40 para 35
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Diminui de 20 para 15
  },
  selectedEmoji: {
    fontSize: 35, // Diminui de 40 para 35
  },
  emojiQuestion: {
    fontSize: 20, // Diminui de 22 para 20
    marginBottom: 12, // Diminui de 15 para 12
    fontWeight: 'bold',
    color: '#333',
  },
  emojiButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  emoji: {
    fontSize: 30, // Diminui de 36 para 30
  },
  emojiButton: {
    padding: 12, // Diminui de 15 para 12
    borderRadius: 12, // Diminui de 15 para 12
  },
  selectedEmojiButton: {
    backgroundColor: '#81D4FA', // Destaque o emoji selecionado
    borderRadius: 20, // Diminui de 25 para 20
    padding: 8, // Diminui de 10 para 8
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 4 para 3
    elevation: 2, // Diminui de 3 para 2
  },
  emojiButtonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // Diminui de 25 para 20
    padding: 12, // Diminui de 15 para 12
    marginHorizontal: 4, // Diminui de 5 para 4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 4 para 3
    elevation: 2, // Diminui de 3 para 2
  },
  dailyAgendaContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15, // Diminui de 20 para 15
    borderRadius: 15, // Diminui de 20 para 15
    marginHorizontal: 15, // Diminui de 20 para 15
    marginTop: 15, // Diminui de 20 para 15
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 4 para 3
    elevation: 3, // Diminui de 4 para 3
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 20, // Diminui de 22 para 20
    marginBottom: 12, // Diminui de 15 para 12
    fontWeight: 'bold',
    color: '#2c67b6',
    textAlign: 'center',
  },
  reminderList: {
    marginTop: 8, // Diminui de 10 para 8
  },
  reminderItem: {
    backgroundColor: '#E3F2FD',
    padding: 12, // Diminui de 15 para 12
    borderRadius: 12, // Diminui de 15 para 12
    marginBottom: 8, // Diminui de 10 para 8
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.2 para 0.15
    shadowRadius: 2, // Diminui de 3 para 2
    elevation: 2, // Diminui de 3 para 2
  },
  reminderText: {
    fontSize: 18, // Diminui de 20 para 18
    fontWeight: 'bold',
    color: '#000000',
  },
  noRemindersText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },
  recentActivitiesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20, // Diminui de 25 para 20
    borderRadius: 12, // Diminui de 15 para 12
    marginHorizontal: 15, // Diminui de 20 para 15
    marginTop: 20, // Diminui de 25 para 20
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Diminui de 2 para 1
    shadowOpacity: 0.2, // Diminui de 0.3 para 0.2
    shadowRadius: 3, // Diminui de 5 para 3
    elevation: 3, // Diminui de 4 para 3
  },
  activities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12, // Diminui de 15 para 12
  },
  activity: {
    alignItems: 'center',
    width: 80, // Diminui de 90 para 80
  },
  activityImage: {
    width: 70, // Diminui de 80 para 70
    height: 70, // Diminui de 80 para 70
    borderRadius: 35, // Diminui de 40 para 35
    marginBottom: 4, // Diminui de 5 para 4
  },
  activityText: {
    fontSize: 12, // Diminui de 14 para 12
    textAlign: 'center',
    marginTop: 4, // Diminui de 5 para 4
    color: '#333',
  },
  viewMoreButton: {
    backgroundColor: '#2c67b6',
    padding: 10, // Diminui de 12 para 10
    borderRadius: 6, // Diminui de 8 para 6
    alignItems: 'center',
    marginTop: 12, // Diminui de 15 para 12
  },
  viewMoreText: {
    color: '#FFF',
    fontSize: 14, // Diminui de 16 para 14
    fontWeight: 'bold',
  },
  activityQuestion: {
    fontSize: 14, // Diminui de 16 para 14
    marginTop: 8, // Diminui de 10 para 8
    fontWeight: 'bold',
    color: '#333',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6, // Diminui de 8 para 6
  },
});

export default HomeScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa o locale para PT-BR
import { useNavigation } from '@react-navigation/native'; // para navegação

const HomeScreen = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reminders, setReminders] = useState({});
  const [todayReminders, setTodayReminders] = useState([]);
  const navigation = useNavigation(); // Hook para navegação

  const emojis = ['😃', '😐', '☹️', '😡'];

  // Função para alterar o emoji selecionado
  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
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

  // Carregar lembretes ao iniciar e sempre que o AsyncStorage for alterado
  useEffect(() => {
    loadReminders();
  }, []);

  const refreshReminders = () => {
    loadReminders();
  };

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.container}>
      <StatusBar barStyle="white-content" backgroundColor="#2c67b6" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Ícone da parte superior */}
        <View style={styles.iconContainer}>
          <Image source={require('../assets/Icone.png')} style={styles.icon} />
        </View>

        {/* Sessão de emojis */}
        <View style={styles.emojiContainer}>
          <View style={styles.selectedEmojiContainer}>
            <Text style={styles.selectedEmoji}>{selectedEmoji || ''}</Text>
          </View>
          <Text style={styles.emojiQuestion}>Como você se sente hoje?</Text>
          <View style={styles.emojiButtonsContainer}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity key={index} onPress={() => selectEmoji(emoji)}>
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
              todayReminders.map((reminder, index) => (
                <View key={index} style={styles.reminderItem}>
                  <Text style={styles.reminderText}>{reminder}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noRemindersText}>Você não tem lembretes para hoje.</Text>
            )}
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={refreshReminders}>
            <Text style={styles.refreshButtonText}>Atualizar lembretes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.agendaButton}
            onPress={() => navigation.navigate('AtividadesDiarias')} // Navega para a tela de atividades diárias
          >
            <Text style={styles.agendaButtonText}>Ver Atividades Diárias</Text>
          </TouchableOpacity>
        </View>

        {/* Sessão de Atividades Recentes */}
        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <View style={styles.activities}>
            <TouchableOpacity style={styles.activity} onPress={() => { /* Função futura */ }}>
              <Image source={require('../assets/AtividadesRecentes/ImgTerapiaOCUPACIONAL.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>TERAPIA OCUPACIONAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activity} onPress={() => { /* Função futura */ }}>
              <Image source={require('../assets/AtividadesRecentes/ImgFONODIOLOGIA.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>FONODIOLOGIA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activity} onPress={() => { /* Função futura */ }}>
              <Image source={require('../assets/AtividadesRecentes/ImgPISCOLOGO.png')} style={styles.activityImage} />
              <Text style={styles.activityText}>PSICÓLOGO(A)</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.viewMoreButton} onPress={() => { /* Função futura */ }}>
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
  scrollContainer: {
    paddingVertical: 20,
  },
  refreshButton: {
    backgroundColor: '#3498DB',
    width: 150,
    height: 60,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  agendaButton: {
    width: 150,
    height: 60,
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  agendaButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  emojiContainer: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  selectedEmojiContainer: {
    backgroundColor: '#D3D3D3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedEmoji: {
    fontSize: 30,
  },
  emojiQuestion: {
    fontSize: 18,
    marginBottom: 10,
  },
  emojiButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  emoji: {
    fontSize: 30,
  },
  dailyAgendaContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  reminderList: {
    marginTop: 10,
  },
  reminderItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  reminderText: {
    fontSize: 14,
  },
  noRemindersText: {
    fontStyle: 'italic',
    color: '#777',
  },
  recentActivitiesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  activities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  activity: {
    alignItems: 'center',
  },
  activityImage: {
    width: 80,
    height: 80,
  },
  activityText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  viewMoreButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default HomeScreen;

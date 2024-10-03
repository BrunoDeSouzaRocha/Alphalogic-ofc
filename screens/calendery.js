import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, StatusBar, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function Calendery() {
  const [selectedDate, setSelectedDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    moment.locale('pt-br');
  }, []);

  const stringToObjt = async () => {
    let listaDeRegistro = await AsyncStorage.getItem('contaUtilizada');
    listaDeRegistro = JSON.parse(listaDeRegistro);
    return listaDeRegistro;
  };

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        let pessoa = await stringToObjt();
        let email = pessoa.Email;
        if (email) {
          setUserEmail(email);
          await loadReminders(email);
        }
      } catch (error) {
        console.error('Erro ao carregar email:', error);
      }
    };
    getUserEmail();
  }, []);

  const loadReminders = async (email) => {
    try {
      const storedReminders = await AsyncStorage.getItem(`reminders_${email}`);
      if (storedReminders) {
        const parsedReminders = JSON.parse(storedReminders);
        setReminders(parsedReminders);
        markReminderDates(parsedReminders);
      }
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    }
  };

  const markReminderDates = (reminders) => {
    const marked = {};
    Object.keys(reminders).forEach((date) => {
      marked[date] = { marked: true, dotColor: '#ff6347' };
    });
    setMarkedDates(marked);
  };

  const saveReminders = async () => {
    try {
      await AsyncStorage.setItem(`reminders_${userEmail}`, JSON.stringify(reminders));
      markReminderDates(reminders);
    } catch (error) {
      console.error('Erro ao salvar lembretes:', error);
    }
  };

  const addReminder = () => {
    if (!selectedDate || !reminder) {
      Alert.alert('Erro', 'Selecione uma data e insira um lembrete.');
      return;
    }

    const updatedReminders = { ...reminders };
    if (!updatedReminders[selectedDate]) {
      updatedReminders[selectedDate] = [];
    }
    updatedReminders[selectedDate].push(reminder);

    setReminders(updatedReminders);
    setReminder('');
    saveReminders();
  };

  const getNextSevenDaysReminders = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days').format('YYYY-MM-DD');
      days.push({
        date,
        dayOfWeek: moment(date).format('dddd'),
        reminders: reminders[date] || [],
      });
    }
    return days;
  };

  const renderNextSevenDaysReminders = () => {
    const nextSevenDays = getNextSevenDaysReminders();
    return (
      <FlatList
        data={nextSevenDays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.reminderItemNextSevenDaysContainer}>
            <View style={styles.reminderItemNextSevenDaysHeader}>
              <Text style={styles.dayText}>
                {item.dayOfWeek}, {moment(item.date).format('DD [de] MMMM [de] YYYY')}
              </Text>
            </View>
            <View style={styles.reminderItemNextSevenDaysBody}>
              {item.reminders.length > 0 ? (
                item.reminders.map((reminder, index) => (
                  <View key={index} style={styles.reminderCard}>
                    <Text style={styles.reminderTextNextSevenDays}>{reminder}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noRemindersTextNextSevenDays}>Sem lembretes</Text>
              )}
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1c4587" />
        <Text style={styles.title}>Calendário de Lembretes</Text>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            ...markedDates,
            [selectedDate]: { selected: true, marked: true, selectedColor: '#00adb5' },
          }}
          style={styles.calendar}
          theme={{
            calendarBackground: '#ffffff',
            selectedDayBackgroundColor: '#00adb5',
            todayTextColor: '#ff6347',
            arrowColor: '#00adb5',
            monthTextColor: '#393e46',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicione seu lembrete"
            placeholderTextColor="#999"
            value={reminder}
            onChangeText={setReminder}
          />

          <TouchableOpacity style={styles.addButton} onPress={addReminder}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Lembretes para {selectedDate ? moment(selectedDate).format('DD [de] MMMM [de] YYYY') : 'Selecione uma data'}
        </Text>

        {reminders[selectedDate] && (
          <FlatList
            data={reminders[selectedDate]}
            renderItem={({ item }) => (
              <View style={styles.reminderItemContainer}>
                <View style={styles.reminderCard}>
                  <Text style={styles.reminderText}>{item}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.reminderList}
          />
        )}

        <Text style={styles.subtitle}>Lembretes dos Próximos 7 Dias</Text>
        {renderNextSevenDaysReminders()}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00adb5',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00adb5',
    padding: 15,
    borderRadius: 50,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  calendar: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  reminderList: {
    marginBottom: 20,
  },
  reminderItemContainer: {
    marginBottom: 10,
  },
  reminderCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#00adb5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reminderItemNextSevenDaysContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00adb5',
  },
  reminderItemNextSevenDaysHeader: {
    backgroundColor: '#00adb5',
    padding: 10,
  },
  reminderItemNextSevenDaysBody: {
    padding: 15,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  reminderTextNextSevenDays: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  noRemindersTextNextSevenDays: {
    fontStyle: 'italic',
    color: '#999',
  },
  reminderText: {
    fontSize: 16,
    color: '#555',
  },
  noRemindersText: {
    fontStyle: 'italic',
    color: '#999',
  },
});
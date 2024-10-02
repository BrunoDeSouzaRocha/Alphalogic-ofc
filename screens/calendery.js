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
      marked[date] = { marked: true, dotColor: 'red' };
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
          <View style={styles.reminderItem}>
            <Text style={styles.dayText}>
              {item.dayOfWeek}, {moment(item.date).format('DD [de] MMMM [de] YYYY')}
            </Text>
            {item.reminders.length > 0 ? (
              item.reminders.map((reminder, index) => (
                <Text key={index} style={styles.reminderText}>{reminder}</Text>
              ))
            ) : (
              <Text style={styles.noRemindersText}>Sem lembretes</Text>
            )}
          </View>
        )}
      />
    );
  };

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="white-content" backgroundColor="#2c67b6" />
        <Text style={styles.title}>Calendário de Lembretes</Text>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            ...markedDates,
            [selectedDate]: { selected: true, marked: true, selectedColor: '#6200ee' },
          }}
          style={styles.calendar}
        />

        <TextInput
          style={styles.input}
          placeholder="Adicione seu lembrete"
          value={reminder}
          onChangeText={setReminder}
        />

        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <Text style={styles.addButtonText}>Adicionar Lembrete</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>
          Lembretes para {selectedDate ? moment(selectedDate).format('DD [de] MMMM [de] YYYY') : 'Selecione uma data'}
        </Text>

        {reminders[selectedDate] && (
          <FlatList
            data={reminders[selectedDate]}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <Text style={styles.reminderText}>{item}</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFF',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  reminderItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reminderText: {
    fontSize: 14,
    color: '#555',
  },
  noRemindersText: {
    fontStyle: 'italic',
    color: '#999',
  },
});

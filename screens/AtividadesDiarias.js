import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AtividadesDiarias = () => {
  const [activities, setActivities] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUserEmail = async () => {
      const accountData = await AsyncStorage.getItem('contaUtilizada');
      const account = JSON.parse(accountData);
      if (account) {
        setUserEmail(account.Email);
        await loadActivities(account.Email);
      }
    };
    getUserEmail();
  }, []);

  const loadActivities = async (email) => {
    try {
      const storedActivities = await AsyncStorage.getItem(`activities_${email}`);
      if (storedActivities) {
        const parsedActivities = JSON.parse(storedActivities);
        const todayDate = moment().format('YYYY-MM-DD');
        setActivities(parsedActivities[todayDate] || []);
      }
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    }
  };

  const handleReaction = async (activityId, reaction) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        return { ...activity, reaction };
      }
      return activity;
    });

    await saveActivities(updatedActivities);
  };

  const handleMarkAsDone = async (activityId) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        return { ...activity, done: !activity.done };
      }
      return activity;
    });

    await saveActivities(updatedActivities);
  };

  const saveActivities = async (updatedActivities) => {
    const todayDate = moment().format('YYYY-MM-DD');
    try {
      const storedActivities = await AsyncStorage.getItem(`activities_${userEmail}`);
      const parsedActivities = storedActivities ? JSON.parse(storedActivities) : {};
      parsedActivities[todayDate] = updatedActivities;
      await AsyncStorage.setItem(`activities_${userEmail}`, JSON.stringify(parsedActivities));
      setActivities(updatedActivities);
    } catch (error) {
      console.error('Erro ao salvar atividades:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityStatus}>A atividade foi realizada?</Text>
      <View style={styles.reactionContainer}>
        <TouchableOpacity onPress={() => handleMarkAsDone(item.id)}>
          <Text style={item.done ? styles.doneButton : styles.notDoneButton}>
            {item.done ? '✅' : '❌'} Marcar como {item.done ? 'Não Feita' : 'Feita'}
          </Text>
        </TouchableOpacity>
        <View style={styles.emojisContainer}>
          {['😃', '😐', '☹️', '😡'].map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => handleReaction(item.id, emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {item.reaction && (
        <Text style={styles.selectedReaction}>Reação: {item.reaction}</Text>
      )}
    </View>
  );

  return (
    <ImageBackground source={require('../assets/Fundo.jpg')} style={styles.background}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  activityContainer: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityStatus: {
    fontSize: 14,
    marginVertical: 5,
  },
  reactionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  doneButton: {
    color: 'green',
    fontWeight: 'bold',
  },
  notDoneButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  emoji: {
    fontSize: 30,
  },
  selectedReaction: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default AtividadesDiarias;

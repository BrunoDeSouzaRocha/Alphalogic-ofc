import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar ícone de seta

const therapists = [
  { id: '1', name: 'Marília Moura', specialty: 'Psiquiatra infantil', availableUntil: '16:30', image: null },
  { id: '2', name: 'Helena Martins', specialty: 'Fonoaudióloga', availableUntil: '16:30', image: null },
  { id: '3', name: 'Carolina Nogueira', specialty: 'Terapeuta ocupacional', availableUntil: '16:30', image: null },
  { id: '4', name: 'Amanda Almeida', specialty: 'Psiquiatra infantil', availableUntil: '16:30', image: null },
  { id: '5', name: 'Gabriela Rocha', specialty: 'Neuropsicólogo', availableUntil: '16:30', image: null },
  // Add more therapists as needed
];

const TherapistSelectionScreen = ({ onTherapistSelect }) => {
  return (
    <View style={styles.containerWithStatusBar}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={therapists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.therapistItem} onPress={() => onTherapistSelect(item)}>
            <View style={styles.therapistInfo}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.therapistImage} />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <View style={styles.therapistDetails}>
                <Text style={styles.therapistName}>{item.name}</Text>
                <Text style={styles.therapistSpecialty}>{item.specialty}</Text>
                <Text style={styles.therapistAvailability}>Disponível até as {item.availableUntil}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ChatScreen = ({ selectedTherapist, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: selectedTherapist.name,
      message: 'Olá, na última sessão, percebemos que o Rafael está mostrando avanços significativos na interação social. Continuem incentivando as atividades que promovem a comunicação.',
      time: '09:03 AM',
      isSentByUser: false,
    },
    {
      id: '2',
      sender: 'Usuário',
      message: 'Obrigada pela atualização! Notei que ele está muito mais comunicativo em casa. Continuarei incentivando.',
      time: '09:10 AM',
      isSentByUser: true,
    },
    {
      id: '3',
      sender: selectedTherapist.name,
      message: 'Segue abaixo o link para visualização das atividades com o foco em interação.',
      time: '09:15 AM',
      isSentByUser: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      const newMessageObject = {
        id: (messages.length + 1).toString(),
        sender: 'Usuário',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSentByUser: true,
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.containerWithStatusBar}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isSentByUser ? styles.userMessage : styles.receivedMessage]}>
            {!item.isSentByUser && (
              <Text style={styles.senderName}>{item.sender}</Text>
            )}
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  return selectedTherapist ? (
    <ChatScreen selectedTherapist={selectedTherapist} onBack={() => setSelectedTherapist(null)} />
  ) : (
    <TherapistSelectionScreen onTherapistSelect={setSelectedTherapist} />
  );
};

const styles = StyleSheet.create({
  containerWithStatusBar: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  therapistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  therapistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  therapistDetails: {
    marginLeft: 10,
  },
  therapistName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  therapistSpecialty: {
    color: '#888',
  },
  therapistAvailability: {
    color: '#888',
  },
  messageContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    margin: 10,
  },
});

export default App;
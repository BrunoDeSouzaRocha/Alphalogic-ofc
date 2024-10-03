import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ProgressBarAndroid } from 'react-native';

const FeedbackAtividade = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { id: 1, symbol: '😊' },  // Emoji de rosto feliz
    { id: 2, symbol: '😢' },  // Emoji de rosto triste
    { id: 3, symbol: '😐' },  // Emoji de rosto neutro
    { id: 4, symbol: '😡' },  // Emoji de rosto com raiva
  ];

  const handleEmojiPress = (id) => {
    setSelectedEmoji(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FEEDBACK DA ATIVIDADE</Text>
        <Image
          style={styles.imageHeader}
          source={require('../AtividadesRealiadas/ImgTerapiaOCUPACIONAL.png')}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ATIVIDADE REALIZADA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>QUAL LUGAR É FEITA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.objectiveContainer}>
        <Text style={styles.subtitle}>Objetivo da atividade</Text>
        <Text style={styles.text}>
          Melhorar a coordenação motora fina, desenvolver habilidades de caligrafia, trabalhar de
          forma multidisciplinar, habilidades diárias da rotina.
        </Text>
      </View>

      <View style={styles.performanceContainer}>
        <Text style={styles.subtitle}>Desempenho nas tarefas</Text>

        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>Manipulação de objetos</Text>
          <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.85} />
          <Text style={styles.percentText}>85%</Text>
        </View>

        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>Habilidades de caligrafias</Text>
          <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} />
          <Text style={styles.percentText}>50%</Text>
        </View>
      </View>

      <View style={styles.emotionContainer}>
        <Text style={styles.subtitle}>Respostas emocionais</Text>
        <View style={styles.emotionIcons}>
          {emojis.map((emoji) => (
            <TouchableOpacity key={emoji.id} onPress={() => handleEmojiPress(emoji.id)}>
            <Text
                style={[
                    styles.emoji,
                    selectedEmoji === emoji.id && styles.selectedEmoji,
                ]}
                >
                {emoji.symbol}
                </Text>

            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  emoji: {
  fontSize: 40,
},
selectedEmoji: {
  borderWidth: 2,
  borderColor: '#00FF00',
  borderRadius: 20,
  padding: 5,  // Ajuste para melhorar a visualização do destaque
},
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageHeader: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5f5fc4',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  objectiveContainer: {
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  performanceContainer: {
    marginTop: 20,
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  percentText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  emotionContainer: {
    marginTop: 30,
  },
  emotionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  selectedIcon: {
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 20,
  },
});

export default FeedbackAtividade;

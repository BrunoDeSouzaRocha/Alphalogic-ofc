import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AtividadesRealizadas = ({ navigation }) => {
  // Funções a serem executadas ao clicar nas imagens
  const handlePress = (activity) => {
    console.log(`Atividade selecionada: ${activity}`);
    // Aqui você pode adicionar navegações ou outras ações
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ATIVIDADES REALIZADAS</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Terapia Ocupacional')} style={[styles.item, { backgroundColor: '#CFE9F3' }]}>
          <Image source={require('../AtividadesRealiadas/ImgTerapiaOCUPACIONAL.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#3A7D90' }]}>TERAPIA OCUPACIONAL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Fonoaudiologia')} style={[styles.item, { backgroundColor: '#FFE5B4' }]}>
          <Image source={require('../AtividadesRealiadas/ImgFONODIOLOGIA.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#D35400' }]}>FONOAUDIOLOGIA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Atividade Física')} style={[styles.item, { backgroundColor: '#F3C1C6' }]}>
          <Image source={require('../AtividadesRealiadas/Captura_de_tela_2024-08-11_144924-removebg-preview 1.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#A94442' }]}>ATIVIDADE FÍSICA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('Psicologo')} style={[styles.item, { backgroundColor: '#E3F3CF' }]}>
          <Image source={require('../AtividadesRealiadas/ImgPISCOLOGO.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#7D9A3E' }]}>PSICÓLOGO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Terapeuta ABA')} style={[styles.item, { backgroundColor: '#CDE7F0' }]}>
          <Image source={require('../AtividadesRealiadas/familia-aproveitando-o-tempo-juntos_23-2148521406 1.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#3A7D90' }]}>TERAPEUTA (ABA)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Musicoterapia')} style={[styles.item, { backgroundColor: '#E1E7F5' }]}>
          <Image source={require('../AtividadesRealiadas/ImgTerapiaOCUPACIONAL.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#4A69BD' }]}>MUSICOTERAPIA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress('Sensorial (TIS)')} style={[styles.item, { backgroundColor: '#F9E7E3' }]}>
          <Image source={require('../AtividadesRealiadas/Captura_de_tela_2024-08-11_144216-removebg-preview 1.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#C0392B' }]}>SENSORIAL (TIS)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Nutricionista')} style={[styles.item, { backgroundColor: '#FFF3C4' }]}>
          <Image source={require('../AtividadesRealiadas/ilustracao-do-dia-da-seguranca-alimentar-do-mundo-plano_23-2149393164-removebg-preview 1.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#D4AC0D' }]}>NUTRICIONISTA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Acompanhamento')} style={[styles.item, { backgroundColor: '#D6EAF8' }]}>
          <Image source={require('../AtividadesRealiadas/professores-e-alunos-com-objetos-escolares_1308-3075-removebg-preview 1.png')} style={styles.image} />
          <Text style={[styles.label, { color: '#2980B9' }]}>ACOMPANHAMENTO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2C3E50',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '90%',
  },
  item: {
    alignItems: 'center',
    width: 120,
    height: 180,
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  label: {
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default AtividadesRealizadas;
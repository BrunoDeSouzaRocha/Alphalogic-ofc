import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home.js';
import Game from './screens/game.js';
import Register from './screens/register.js';
import Login from './screens/login.js';
import Calendery from './screens/calendery.js';
import Profile from './screens/profile.js';
import AtividadesDiarias from './screens/AtividadesDiarias';
import ActivitiesPage from './screens/AtividadesRealiadas/ActivitiesPage.js' 
import FeedbackAtividade from './screens/AtividadesRealiadas/terapiaOcupacional.js'
import Mensagem from './screens/Mensagem.js'





import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconPath;
          if (route.name === 'Home') {
            iconPath = require('./assets/Container/HomePage.png');
          } else if (route.name === 'Game') {
            iconPath = require('./assets/Container/GamePage.png');
          } else if (route.name === 'Calendery') {
            iconPath = require('./assets/Container/Calenderypage.png');
          } else if (route.name === 'Profile') {
            iconPath = require('./assets/Container/Perfil.png');
          }else if (route.name === 'Mensagem') {
            iconPath = require('./assets/Container/MensagemHome copy.png');
          }

          return <Image source={iconPath} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Calendery" component={Calendery} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Mensagem" component={Mensagem} />


    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ATIVIDADES REALIZADAS" 
        component={ActivitiesPage}           
        options={{ headerShown: true }}/>

        <Stack.Screen name="Terapia Ocupacional" 
        component={FeedbackAtividade}           
        options={{ headerShown: true }}/>

        
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AtividadesDiarias"
          component={AtividadesDiarias}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

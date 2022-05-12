import React from 'react';

// Import de la LogBox qui efface les erreurs visible sur le telephone
import { LogBox } from 'react-native';

// Desactive les warnings sur le telephone
LogBox.ignoreAllLogs();

// Import de la navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import des screens
import Home from './screens/Home';
import Reservation from './screens/Reservation';
import Search from './screens/Search';
import Profil from './screens/Profil';

// Import des icones pour la navbar
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabBar" component={tabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function tabBar() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Finded') {
          iconName = 'home'
        } else if (route.name === 'Reservation') {
          iconName = 'calendar'
        } else if (route.name === 'Recherche') {
          iconName = 'md-search'
        } else if (route.name === 'Profil') {
          iconName = 'person'
        }
        return <Ionicons name={iconName} size={32} color={color} />;
      },
    })}

      tabBarOptions={{
        activeTintColor: '#7241DB',
        inactiveTintColor: '#3DA787',
        activeBackgroundColor: '#FFFFFF',
        inactiveBackgroundColor: '#FFFFFF',
        showLabel: false,
      }}>
      <Tab.Screen name="Finded" component={Home} />
      <Tab.Screen name="Reservation" component={Reservation} />
      <Tab.Screen name="Recherche" component={Search} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  )
}
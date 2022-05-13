import React from 'react';

// Import des navigations
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import de la LogBox qui efface les erreurs visible sur le telephone
import { LogBox } from 'react-native';

// Desactive les warnings sur le telephone
LogBox.ignoreAllLogs();

// Import des icones pour la navbar
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Search from './screens/Search';
import Reservation from './screens/Reservation';
import Profil from './screens/Profil';
import EditProfil from './screens/EditProfil';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

const ReservationStack = createStackNavigator();

function ReservationStackScreen() {
  return (
    <ReservationStack.Navigator screenOptions={{ headerShown: false }}>
      <ReservationStack.Screen name="Reservation" component={Reservation} />
    </ReservationStack.Navigator>
  );
}

const ProfilStack = createStackNavigator();

function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfilStack.Screen name="Profil" component={Profil} />
      <ProfilStack.Screen name="EditProfil" component={EditProfil} />
    </ProfilStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'home'
                } else if (route.name === 'Reservation') {
                  iconName = 'calendar'
                } else if (route.name === 'Search') {
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
            }}
            >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchStackStackScreen} />
        <Tab.Screen name="Reservation" component={ReservationStackScreen} />
        <Tab.Screen name="Profil" component={ProfilStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
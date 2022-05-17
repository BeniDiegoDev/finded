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

// Import de Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import prestataires from './reducers/prestataires';

const store = createStore(combineReducers({ prestataires }));

import Home from './screens/Home';
import Prestataire from './screens/Prestataire';
import AllCategories from './screens/AllCategories';
import Categories from './screens/Categories';
import Search from './screens/Search';
import Reservation from './screens/ProfilPages/Reservations';
import Profil from './screens/Profil';
import DatePicker from './screens/DatePicker';
import EditProfil from './screens/ProfilPages/EditProfil';
import Adresses from './screens/ProfilPages/Adresses';
import Reservations from './screens/ProfilPages/Reservations';
import Cards from './screens/ProfilPages/Cards';
import Messages from './screens/ProfilPages/Messages';
import Favoris from './screens/ProfilPages/Favoris';
import Help from './screens/ProfilPages/Help';
import Conversation from './screens/ProfilPages/Conversation';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Prestataire" component={PrestationStackScreen} />
      <HomeStack.Screen name="AllCategories" component={AllCategories} />
      <HomeStack.Screen name="Categories" component={Categories} />
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

const PrestationStack = createStackNavigator();
function PrestationStackScreen() {
  return (
    <PrestationStack.Navigator screenOptions={{ headerShown: false }}>
      <PrestationStack.Screen name="Prestataire" component={Prestataire} />
      <PrestationStack.Screen name="DatePicker" component={DatePicker} />
    </PrestationStack.Navigator>
  );
}

const ProfilStack = createStackNavigator();

function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfilStack.Screen name="Profil" component={Profil} />
      <ProfilStack.Screen name="EditProfil" component={EditProfil} />
      <ProfilStack.Screen name="Adresses" component={Adresses} />
      <ProfilStack.Screen name="Reservations" component={Reservations} />
      <ProfilStack.Screen name="Cards" component={Cards} />
      <ProfilStack.Screen name="Messages" component={Messages} />
      <ProfilStack.Screen name="Favoris" component={Favoris} />
      <ProfilStack.Screen name="Help" component={Help} />
      <ProfilStack.Screen name='Conversation' component={Conversation} />
    </ProfilStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
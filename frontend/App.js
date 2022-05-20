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
import selectPresta from './reducers/selectPresta';
import listPrestations from './reducers/listPrestations';
import selectCreneau from './reducers/selectCreneau';
import infoUser from './reducers/infoUser';
import location from './reducers/location';

const store = createStore(combineReducers({ prestataires, selectPresta, listPrestations, location, infoUser, selectCreneau }));

import Home from './screens/Home';
import Prestataire from './screens/Prestataire';
import AllCategories from './screens/AllCategories';
import Categories from './screens/Categories';
import Search from './screens/Search';
import Map from './screens/Map';
import Reservation from './screens/ProfilPages/Reservations';
import Profil from './screens/Profil';
import DatePicker from './screens/DatePicker';
import DetailResa from './screens/DetailResa';
import Paiement from './screens/Paiement';
import EditProfil from './screens/ProfilPages/EditProfil';
import Adresses from './screens/ProfilPages/Adresses';
import Reservations from './screens/ProfilPages/Reservations';
import Cards from './screens/ProfilPages/Cards';
import Messages from './screens/ProfilPages/Messages';
import Favoris from './screens/ProfilPages/Favoris';
import Help from './screens/ProfilPages/Help';
import Conversation from './screens/ProfilPages/Conversation';
import MentionsLegales from './screens/ProfilPages/MentionsLegales';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Prestataire" component={PrestationStackScreen} />
      <HomeStack.Screen name="AllCategories" component={AllCategories} />
      <HomeStack.Screen name="Categories" component={Categories} />
      <HomeStack.Screen name="Map" component={Map} />
      <HomeStack.Screen name="Welcome" component={Welcome} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Map" component={Map} />
      <SearchStack.Screen name="Prestataire" component={Prestataire} />
      <SearchStack.Screen name="DatePicker" component={DatePicker} />
      <SearchStack.Screen name="DetailResa" component={DetailResa} />
      <SearchStack.Screen name="Paiement" component={Paiement} />
      <SearchStack.Screen name='SignIn' component={Signin} />
      <SearchStack.Screen name='SignUp' component={Signup} />
      <SearchStack.Screen name="Welcome" component={Welcome} />
    </SearchStack.Navigator>
  );
}

const ReservationStack = createStackNavigator();

function ReservationStackScreen() {
  return (
    <ReservationStack.Navigator screenOptions={{ headerShown: false }}>
      <ReservationStack.Screen name="Reservation" component={Reservation} />
      <ReservationStack.Screen name='SignIn' component={Signin} />
      <ReservationStack.Screen name='SignUp' component={Signup} />
      <ReservationStack.Screen name="Welcome" component={Welcome} />
    </ReservationStack.Navigator>
  );
}

const PrestationStack = createStackNavigator();

function PrestationStackScreen() {
  return (
    <PrestationStack.Navigator screenOptions={{ headerShown: false }}>
      <PrestationStack.Screen name="Prestataire" component={Prestataire} />
      <PrestationStack.Screen name="DatePicker" component={DatePicker} />
      <PrestationStack.Screen name="DetailResa" component={DetailResa} />
      <PrestationStack.Screen name="Paiement" component={Paiement} />
      <PrestationStack.Screen name='SignIn' component={Signin} />
      <PrestationStack.Screen name='SignUp' component={Signup} />
      <PrestationStack.Screen name="Welcome" component={Welcome} />
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
      <ProfilStack.Screen name='MentionsLegales' component={MentionsLegales} />
      <ProfilStack.Screen name='SignIn' component={Signin} />
      <ProfilStack.Screen name='SignUp' component={Signup} />
      <ProfilStack.Screen name="Welcome" component={Welcome} />
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
                iconName = 'map'
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
          <Tab.Screen name="Home" component={HomeStackScreen} options={{unmountOnBlur: true}}/>
          <Tab.Screen name="Search" component={SearchStackStackScreen} options={{unmountOnBlur: true}} />
          <Tab.Screen name="Reservation" component={ReservationStackScreen} options={{unmountOnBlur: true}} />
          <Tab.Screen name="Profil" component={ProfilStackScreen} options={{unmountOnBlur: true}} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
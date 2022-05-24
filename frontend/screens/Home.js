import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import module de geolocalisation via Expo
import * as Location from 'expo-location';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Import components
import Listing from '../components/Listing'

// Config IP pour connexion avec le backend
const ip = "192.168.10.167"

// Debut de la fonction Home qui gere toute la page HOME
function Home(props) {

  // Necessaire pour la barre de recherche
  const [search, setSearch] = useState("");
  const [viewSearch, setViewSearch] = useState(false)

  const updateSearch = (search) => {
    setSearch(search);
    if (search == "") {
      setViewSearch(false)
    } else {
      setViewSearch(true)
    }
  };

  // Envoi en dur des categories
  var Categories = [
    { image: require('../assets/categories/mechanic.png'), color: '#3DA787', name: 'Mécanique' },
    { image: require('../assets/categories/haircut.png'), color: '#7241DB', name: 'Coiffeur' },
    { image: require('../assets/categories/massage-des-pieds.png'), color: '#3DA787', name: 'Pédicure' },
    { image: require('../assets/categories/massage.png'), color: '#7241DB', name: 'Massage' },
    { image: require('../assets/categories/mother.png'), color: '#3DA787', name: 'Baby-Sitting' },
    { image: require('../assets/categories/peinture.png'), color: '#7241DB', name: 'Peinture' },
    { image: require('../assets/categories/relooking.png'), color: '#3DA787', name: 'Maquillage' },
    { image: require('../assets/categories/trou-de-serrure.png'), color: '#7241DB', name: 'Serrurier' },
  ]

  // Necessaire pour la Geo Localisation
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Affichage selon statut de la Geo Localisation
  let geoloc = 'Recherche...';

  if (errorMsg) {
    geoloc = errorMsg;
  } else if (location) {
    geoloc = location
  }

  // Recuperation des informations Prestataires en BDD
  useEffect(() => {
    async function loadData() {
      let prestataireInBdd = await fetch(`http://${ip}:3000/recuppresta`)
      let responsePresta = await prestataireInBdd.json()

      props.addPrestataire(responsePresta.prestataires)
    }
    loadData()
  }, []);

  // Recuperation du nom de la ville via Geo Localisation du mobile et transformer par l'API OpenWeatherApp en nom de ville grace aux coords
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      props.addLocation(location.coords)

      let latitude = location.coords.latitude
      let longitude = location.coords.longitude

      var cityName = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c815b9455235455a301668a56c67b18`)

      let response = await cityName.json()

      // console.log(response)
      setLocation(response.name)

    })();
  }, []);

  let recherche = search.split(" ")

  // Listing pour la barre de recherche
  let listingSearch = props.preStataires.map((element, i) => {
    if (
      element.name.toLowerCase().includes(search.toLowerCase()) ||
      element.address.toLowerCase().includes(search.toLowerCase()) ||
      element.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      search.toLowerCase() == element.city.toLowerCase() ||
      search.toLowerCase() == element.zipcode.toLowerCase() ||
      search.toLowerCase() == element.categoryName.toLowerCase() + " " + element.city.toLowerCase() ||
      search.toLowerCase() == element.categoryName.toLowerCase() + " " + element.zipcode ||
      search.toLowerCase() == element.name.toLowerCase() ||
      search.toLowerCase() == element.number + " " + element.address.toLowerCase() ||
      search.toLowerCase() == element.number + " " + element.address.toLowerCase() + " " + element.zipcode ||
      search.toLowerCase() == element.address.toLowerCase() + " " + element.zipcode ||
      search === "") {
      return (
        <Listing key={i} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
      )
    }
  })

  // Filtre appliqué pour n'afficher que les fiches avec une note superieur à 4.9
  let listingFilter = props.preStataires.filter(elem => elem.note >= 4.9)

  // Affichage grace au resultat du filtre
  let listing = listingFilter.map((element, i) => {
    return (
      <Listing key={i} id={props.id} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
    )
  })

  // Partie visuel de la page HOME
  if (search != "") {
    return (
      <View style={styles.container}>

        <View style={styles.finded}>
          <Text style={{
            color: '#7241DB',
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: 20,
          }}>Finded</Text>
        </View>

        <View style={styles.topsearchbar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Ionicons name='location' size={32} color='#3DA787' />
            <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>{geoloc}</Text>
          </View>
          
        </View>

        <View style={styles.searchbar}>
          <SearchBar
            placeholder="Rechercher..."
            onChangeText={updateSearch}
            value={search}
            lightTheme="true"
            containerStyle={{ backgroundColor: 'white', borderTopColor: 'white', borderBottomColor: 'white' }}
            leftIconContainerStyle={{ backgroundColor: 'white' }}
            inputStyle={{ backgroundColor: 'white' }}
            inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderBottomWidth: 1 }}
          />
        </View>

        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
          {listingSearch}
        </ScrollView >

      </View>
    );
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.finded}>
          <Text style={{
            color: '#7241DB',
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: 20,
          }}>Finded</Text>
        </View>

        <View style={styles.topsearchbar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Ionicons name='location' size={32} color='#3DA787' />
            <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>{geoloc}</Text>
          </View>
          
        </View>

        <View style={styles.searchbar}>
          <SearchBar
            placeholder="Rechercher..."
            onChangeText={updateSearch}
            value={search}
            lightTheme="true"
            containerStyle={{ backgroundColor: 'white', borderTopColor: 'white', borderBottomColor: 'white' }}
            leftIconContainerStyle={{ backgroundColor: 'white' }}
            inputStyle={{ backgroundColor: 'white' }}
            inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderBottomWidth: 1 }}
          />
        </View>

        <View style={styles.categoriestop}>
          <Text style={{ paddingLeft: 15, fontSize: 30 }}>Catégories</Text>
          <Text onPress={() => { props.navigation.navigate('AllCategories') }} style={{ paddingRight: 15, fontWeight: 'bold', fontSize: 17 }}>Voir tout <Ionicons name='chevron-forward' size={15} color='black' /></Text>
        </View>

        <View style={styles.categories}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Categories.map((element, i) => {
              return (
                <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Categories', { name: element.name }) }}>
                  <View style={styles.categorieswidget} >

                    <Image
                      rounded
                      backgroundColor={element.color}
                      style={{ borderRadius: 50, height: 70, width: 70, marginBottom: 10, borderColor: 'black', borderWidth: 3, }}
                      source={element.image}
                      
                    />
                    <Text style={{ textAlign: 'center' }}>{element.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
            }
          </ScrollView>
        </View>

        <View style={styles.categoriestext}>
          <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 20 }}>Prestataires populaires</Text>
        </View>

        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
          {listing}
        </ScrollView >

      </View>
    )
  }
}

// Style appliqué
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40,
  },
  finded: {
    width: '100%',
    marginVertical:10
  },
  topsearchbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchbar: {
    width: '100%',
    paddingTop: 10,
  },
  categoriestop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  categories: {
    flexDirection: 'row',
  },
  categorieswidget: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  categoriestext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
});

//
function mapStateToProps(state) {
  return { preStataires: state.prestataires }
}

//
function mapDispatchToProps(dispatch) {
  return {
    addPrestataire: function (prestataires) {
      dispatch({
        type: 'addPrestataire',
        prestataires
      })
    },
    addLocation: function (location) {
      dispatch({
        type: 'addLocation',
        location
      })
    },
    selectPresta: function (name) {
      dispatch({
        type: 'selectPrestataire',
        name
      })
    }
  }

}

//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

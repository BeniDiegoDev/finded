import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import module de geolocalisation via Expo
import * as Location from 'expo-location';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Import components
import Listing from '../components/Listing'

// Config IP pour connexion avec le backend
const ip = "192.168.10.155"

function Home(props) {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

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

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function loadData() {
      let prestataireInBdd = await fetch(`http://${ip}:3000/recuppresta`)
      let responsePresta = await prestataireInBdd.json()

      props.updateReducer(responsePresta.prestataires)

    }
    loadData()
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let latitude = JSON.parse(location.coords.latitude)
      let longitude = JSON.parse(location.coords.longitude)

      // console.log('latitude :', latitude, 'longitude :', longitude)

      var cityName = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c815b9455235455a301668a56c67b18`)

      let response = await cityName.json()

      // console.log(response.name)

      setLocation(response.name)

    })();
  }, []);

  // console.log("je suis le console du front " + props.prestataires)



  let geoloc = 'Géolocalisation en cours..';

  if (errorMsg) {
    geoloc = errorMsg;
  } else if (location) {
    geoloc = location;
  }

  let listingFilter = props.preStataires.filter(elem => elem.note >= 4.9)

  let listing = listingFilter.map((element, i) => {
    return (
        <Listing key={i} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} />
    )
  })

  // function onPressCategories() => {
  //   'Details', {
  //     itemId: 86,
  //     otherParam: 'anything you want here',
  // }

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
        <View style={{ marginRight: 10 }}>
          <Button
            buttonStyle={{ borderColor: "#7241DB" }}
            titleStyle={{ color: '#7241DB', fontSize: 17 }}
            title="Autour de vous"
            type="outline"
            containerStyle={{ marginLeft: 20, }}
          />
        </View>
      </View>

      <View style={styles.searchbar}>
        <SearchBar
          placeholder="Recherche"
          onChangeText={updateSearch}
          value={search}
          lightTheme="true"
          containerStyle={{ backgroundColor: 'white', borderTopColor: 'white', borderBottomColor: 'white' }}
          leftIconContainerStyle={{ backgroundColor: 'white' }}
          inputStyle={{ backgroundColor: 'white' }}
          inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, borderBottomWidth: 1 }}
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
              <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Categories', {name : element.name}) }}>
                <View style={styles.categorieswidget}>

                  <Image
                    rounded
                    backgroundColor={element.color}
                    style={{ borderRadius: 50, height: 70, width: 70, marginBottom: 10, borderColor: 'black', borderWidth: 3 }}
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


  );
}

const styles = StyleSheet.create({
  fontsize: {
    fontSize: 17,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40,
  },
  finded: {
    width: '100%',
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

function mapStateToProps(state) {
  return { preStataires: state.prestataires, }
}

function mapDispatchToProps(dispatch) {
  return {
    updateReducer: function (prestataires) {
      dispatch({
        type: 'addPrestataire',
        prestataires
      })
    }
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

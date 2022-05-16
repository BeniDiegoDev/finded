import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import module de geolocalisation via Expo
import * as Location from 'expo-location';

export default function Home(props) {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  var fakeCategories = [
    { image: require('../assets/categories/haircut.png'), color: '#7241DB', name: 'Coiffeur' },
    { image: require('../assets/categories/massage-des-pieds.png'), color: '#3DA787', name: 'Pédicure' },
    { image: require('../assets/categories/massage.png'), color: '#7241DB', name: 'Massage' },
    { image: require('../assets/categories/mother.png'), color: '#3DA787', name: 'Baby-Sitting' },
    { image: require('../assets/categories/peinture.png'), color: '#7241DB', name: 'Peinture' },
    { image: require('../assets/categories/relooking.png'), color: '#3DA787', name: 'Maquillage' },
    { image: require('../assets/categories/trou-de-serrure.png'), color: '#7241DB', name: 'Serrurier' },
  ]

  var fakeTableau = [
    { image: require('../assets/fakeminia/miniatest2.jpg'), name: "Controle Technique Mant'te", city: 'Paris 13e', adress: "875 boulevard de Mantes", note: 5 },
    { image: require('../assets/fakeminia/miniatest1.jpg'), name: 'Coiffeur du Marnois', city: 'Paris 15e', adress: "92 rue de la Marne", note: 4.6 },
    { image: require('../assets/fakeminia/miniatest3.jpg'), name: "Montagn'enfance", city: 'Paris 17e', adress: "1515 boulevard Montagne", note: 4.5 },
    { image: require('../assets/fakeminia/miniatest4.jpg'), name: 'Beni Crochet', city: 'Paris 13e', adress: "2509 rue de Beni", note: 4.5 },
    { image: require('../assets/fakeminia/miniatest5.jpg'), name: 'Massage du 15', city: 'Paris 14e', adress: "5 rue de Paris", note: 4.4 },
    { image: require('../assets/fakeminia/miniatest6.jpg'), name: "Pedic'dona", city: 'Paris 14e', adress: "165 rue Donatelo", note: 4.3 },
    { image: require('../assets/fakeminia/miniatest7.jpg'), name: 'Maquille Moi des Champs', city: 'Paris 15e', adress: "14 avenue des Champs Elysees", note: 4.1 },
  ]

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  let geoloc = 'Géolocalisation en cours..';

  if (errorMsg) {
    geoloc = errorMsg;
  } else if (location) {
    geoloc = location;
  }


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
          {fakeCategories.map((element, i) => {
            return (
              <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Categories') }}>
                <View style={styles.categorieswidget}>

                  <Image
                    rounded
                    backgroundColor={element.color}
                    style={{ borderRadius: 50, height: 90, width: 90, marginBottom: 10, borderColor: 'black', borderWidth: 3 }}
                    source={element.image}
                  />
                  <Text style={{ textAlign: 'center', fontSize: 17 }}>{element.name}</Text>
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
        {fakeTableau.map((element, i) => {
          return (
            <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Prestataire') }}>
              <Card
                containerStyle={{ padding: 0, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row' }} >
                  <Image
                    style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 100, width: 100 }}
                    source={element.image}
                  />
                  <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '65%' }}>
                    <Text style={styles.fontsize}>{element.name}</Text>
                    <Text >{element.adress}</Text>
                    <Text >{element.city}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10 }}>{element.note}</Text>
                      <Ionicons name="md-star" size={17} color="#F5B642" style={{ marginLeft: 10 }} />
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableWithoutFeedback>
          )
        })
        }
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
  },
  categoriestext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 5,
  },
});

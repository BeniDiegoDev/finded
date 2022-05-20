import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import components
import Listing from '../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

function AllCategories(props) {

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

  var Categories = [
    { image: require('../assets/categories/mechanic.png'), color: '#3DA787', name: 'Mécanique' },
    { image: require('../assets/categories/haircut.png'), color: '#7241DB', name: 'Coiffeur' },
    { image: require('../assets/categories/massage-des-pieds.png'), color: '#7241DB', name: 'Pédicure' },
    { image: require('../assets/categories/massage.png'), color: '#3DA787', name: 'Massage' },
    { image: require('../assets/categories/mother.png'), color: '#3DA787', name: 'Baby-Sitting' },
    { image: require('../assets/categories/peinture.png'), color: '#7241DB', name: 'Peinture' },
    { image: require('../assets/categories/relooking.png'), color: '#7241DB', name: 'Maquillage' },
    { image: require('../assets/categories/trou-de-serrure.png'), color: '#3DA787', name: 'Serrurier' },
  ]

  let recherche = search.split(" ")

  // Listing pour la barre de recherche
  let listingSearch = props.preStataires.map((element, i) => {
    for (let j = 0; j < recherche.length; j++) {
      // console.log(search)
      if (recherche[j] == element.city || recherche[j] == element.zipcode || recherche[j] == element.categoryName || search === "") {
        return (
          <Listing key={i} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
        )
      }
    }
  })

  if (search != "") {
    return (
      <View style={styles.container}>

        <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Catégories</Text>
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
            inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, borderBottomWidth: 1 }}
          />
        </View>

        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
          {listingSearch}
        </ScrollView >

      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Catégories</Text>
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
            inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 10, borderBottomWidth: 1 }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ marginHorizontal: '5%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {Categories.map((element, i) => {
              return (
                <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Categories', { name: element.name }) }}>
                  <View style={{ backgroundColor: element.color, alignItems: 'center', marginVertical: 10, paddingVertical: 10, width: '45%', marginHorizontal: '2.5%', borderRadius:10, shadowColor:'black', shadowOffset:{width:0, height:4}, shadowOpacity:0.32, shadowRadius:5.46, elevation:5 }}>
                    <Image
                      style={{ height: 90, width: 90 }}
                      source={element.image}
                    />
                    <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 20 }}>{element.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
            }
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40,
  },
  searchbar: {
    width: '100%',
    paddingBottom: 10,
  },
});

function mapStateToProps(state) {
  return { preStataires: state.prestataires, }
}

export default connect(
  mapStateToProps,
  null
)(AllCategories);
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import components
import Listing from '../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

function Categories(props) {

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

  let listingFilter = props.preStataires.filter(elem => elem.categoryName == props.route.params.name)

  let listing = listingFilter.map((element, i) => {
    return (
        <Listing key={i} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
    )
  })

  // Recupere les infos du clique
  // console.log(props.route.params.name)

  if (search != "") {
    return (
      <View style={styles.container}>

        <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> {props.route.params.name}</Text>
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
          <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> {props.route.params.name}</Text>
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
          {listing}
        </ScrollView >

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
)(Categories);

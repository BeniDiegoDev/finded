import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

export default function AllCategories(props) {

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

  return (
    <View style={styles.container}>

      <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}>
        <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Catégories</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent : 'center' }}>
          {fakeCategories.map((element, i) => {
            return (
              <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate('Categories') }}>
                <View style={{ marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10, height: 170, width: 170, backgroundColor: element.color, alignItems: 'center', justifyContent: 'center', borderWidth: 3 }}>
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
  );
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

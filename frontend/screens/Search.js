import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

export default function Search(props) {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  var fakeTableau = [
    { image: require('../assets/fakeminia/miniatest2.jpg'), name: "Controle Technique Mant'te", city: 'Paris 13e', adress: "875 boulevard de Mantes", note: 5 },
    { image: require('../assets/fakeminia/miniatest1.jpg'), name: 'Coiffeur du Marnois', city: 'Paris 15e', adress: "92 rue de la Marne", note: 4.6 },
    { image: require('../assets/fakeminia/miniatest3.jpg'), name: "Montagn'enfance", city: 'Paris 17e', adress: "1515 boulevard Montagne", note: 4.5 },
    { image: require('../assets/fakeminia/miniatest4.jpg'), name: 'Beni Crochet', city: 'Paris 13e', adress: "2509 rue de Beni", note: 4.5 },
    { image: require('../assets/fakeminia/miniatest5.jpg'), name: 'Massage du 15', city: 'Paris 14e', adress: "5 rue de Paris", note: 4.4 },
    { image: require('../assets/fakeminia/miniatest6.jpg'), name: "Pedic'dona", city: 'Paris 14e', adress: "165 rue Donatelo", note: 4.3 },
    { image: require('../assets/fakeminia/miniatest7.jpg'), name: 'Maquille Moi des Champs', city: 'Paris 15e', adress: "14 avenue des Champs Elysees", note: 4.1 },
  ]

  return (
    <View style={styles.container}>

      <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
        <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Recherche</Text>
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

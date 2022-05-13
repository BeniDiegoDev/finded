import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche
import { SearchBar, Avatar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones pour la navbar
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  var fakeCategories = [
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 1' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 2' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 3' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 4' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 5' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 6' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 7' },
    { image: { name: 'adb', type: 'material' }, name: 'Categorie 8' },
  ]

  var fakeTableau = [
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 1', city: 'Paris 17e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 2', city: 'Paris 15e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 3', city: 'Paris 14e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 4', city: 'Paris 13e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 5', city: 'Paris 15e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 6', city: 'Paris 14e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
    { image: { name: 'adb', type: 'material' }, name: 'Prestataire 7', city: 'Paris 13e', desc: "Entreprise connu depuis plus de 100 ans pour son patrimoine, vous pourrez profiter d'une grande claque de plaisir", note: 4.5 },
  ]

  return (

    <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Paris 17e</Text>
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
            inputContainerStyle={{ backgroundColor: 'white' }}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.categories}>
            {fakeCategories.map((element, i) => {
              return (
                <View key={i} style={styles.categorieswidget}>
                  <Avatar
                    rounded
                    icon={element.image}
                    containerStyle={{ backgroundColor: 'orange' }}
                    size="large"
                  />
                  <Text style={{ textAlign: 'center' }}>{element.name}</Text>
                </View>
              )
            })
            }
          </View>
        </ScrollView>

        <View style={styles.categoriestext}>
          <Text style={{ marginRight: 5, fontWeight: 'bold' }}>Voir tout</Text>
          <Ionicons name='chevron-forward' size={15} color='black' />
        </View>

        <View style={styles.cards}>
          {fakeTableau.map((element, i) => {
            return (
              <Card key={i}>
                <View style={{ flexDirection: 'row' }}>
                  <Avatar
                    rounded
                    icon={element.image}
                    containerStyle={{ backgroundColor: 'orange' }}
                    size="large"
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text>{element.name}</Text>
                    <Text>{element.city}</Text>
                    <Text style={{ maxWidth: '90%' }}>{element.desc}</Text>
                    <View>
                      <Text>{element.note}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            )
          })
          }
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
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
  },
  categories: {
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  categorieswidget: {
    marginRight: 20,
  },
  categoriestext: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 15,
    paddingTop: 10,
  },
  cards: {
    width: '100%',
  }
});

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche
import { SearchBar } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones pour la navbar
import { Ionicons } from '@expo/vector-icons';

function Home() {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style={styles.finded}>
          <Text style={{
            color: '#7241DB',
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>Finded</Text>
        </View>
        <View style={styles.topsearchbar}>
          <Text>Picto Ville </Text>
          <Button title="Autour de vous" type="outline" />
        </View>
        <View style={styles.searchbar}>
          <SearchBar
            placeholder="Recherche"
            onChangeText={updateSearch}
            value={search}
            lightTheme="true"
            containerStyle={{backgroundColor : 'white'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  safearea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  finded: {
    width: '100%',
    marginTop: 10,
  },
  topsearchbar: {
    width: '30%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchbar: {
    width: '100%',
    marginTop: 10,
  },
});

export default (Home)
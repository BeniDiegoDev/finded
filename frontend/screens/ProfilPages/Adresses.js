import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

export default function Adresses(props) {

  var swipeoutBtns = [
    {
      text: 'Supprimer',
      backgroundColor: '#FF0000',
    },
    {
      text: 'Modifier',
      backgroundColor: '#7241DB',
    }
  ]

  let adresses = [
    {
      icon : <MaterialCommunityIcons name="home-variant" size={35} color="#7241DB" style={{marginRight:10}}/>,
      name : 'Domicile',
      adress : '12 Rue de la paix\n75000 Paris',
    },
    {
      icon : <MaterialIcons name="card-travel" size={35} color="#7241DB" style={{marginRight:10}}/>,
      name : 'Travail',
      adress : '14 Avenue Mongo\n33000 Bordeaux',
    },
    {
      icon : <Entypo name="feather" size={30} color="#7241DB" style={{marginRight:10}}/> ,
      name : 'Vacances',
      adress : `1 Boulevard des vacances\n06200 Nice`,
    }
  ];

  let adressesList = adresses.map((item, index) => {
    return (
      <Swipeout autoClose right={swipeoutBtns} style={{backgroundColor:'white'}}>
        <View style={styles.personnal_informations} key={index}>
          <View style={styles.adresses_container}>
              {item.icon}
              <View>
                <Text style={styles.icon}>{item.name}</Text>
                <Text style={[styles.icon, styles.adresses]}>{item.adress}</Text>
              </View>
          </View>
        </View>
      </Swipeout>
    )
  })

 
    return (
      <View style={styles.container}>
      <View>
        <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
            <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Mes adresses</Text>
        </View>
            {adressesList}
      </View>
        <View style={{display:'flex', alignItems:'center'}}>
          <Text style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>Ajouter une adresse</Text>
        </View>
    </View>
    );
  
  };

const styles = StyleSheet.create({
    container:{
      paddingTop:50,
      flex:1,
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    },
    icon: {
        marginHorizontal:10,
        marginVertical: 5, 
        fontSize: 18
    },
    personnal_informations: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        marginHorizontal:20,  
    },
    button: {
        marginTop:30,
    },
    adresses_container: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    adresses: {
        color:'#828282'
    }

});

  
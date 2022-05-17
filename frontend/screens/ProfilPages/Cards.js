import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

export default function Cards(props) {

  let payment = [
    {
      title: 'Carte Perso',
      icon: 'cc-visa',
      type: 'visa',
      number: '**** **** 4242',
      expiration: '12/25',
    },
    {
      title: 'Carte Beni',
      icon: 'cc-mastercard',
      type: 'mastercard',
      number: '**** **** 2509',
      expiration: '10/26',
    },
    {
      title: 'Paypal Perso',
      icon: 'paypal',
      type: 'paypal',
      number: '',
      expiration: '',
    },
  ];

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

  let paymentList = payment.map((item, index) => {
    return (
      <Swipeout autoClose right={swipeoutBtns} style={{backgroundColor:'white'}} key={index}>
        <View style={styles.personnal_informations} >
            <View style={styles.adresses_container}>
                <FontAwesome name={item.icon} size={35} color="#7241DB" style={{marginRight:10}} />
                <View>
                  <Text style={styles.icon}>{item.title}</Text>
                  <Text style={[styles.icon, styles.adresses]}>{item.type}</Text>
                </View>
            </View>
            <View style={styles.cards_infos}>
              <Text style={styles.icon}>{item.number}</Text>
              <Text style={styles.icon}>{item.expiration}</Text>
            </View>
        </View>
      </Swipeout>
    )
  });
 
    return (
        <View style={styles.container}>
          <View>
            <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
                <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Mon Wallet</Text>
            </View>
                {paymentList}
          </View>
            <View style={{display:'flex', alignItems:'center'}}>
              <Text style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>Ajouter un moyen de paiement</Text>
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
        paddingHorizontal:10,
        marginVertical: 5, 
        fontSize: 18
    },
    personnal_informations: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:25,
        paddingHorizontal:20
    },
    modify_remove: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        borderBottomWidth: 1,
        paddingVertical:30
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
    },
    cards_infos: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'space-between',
    }

});

  
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, StatusBar } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche
import { SearchBar, Avatar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones 
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { Divider, Tab } from 'react-native-elements';

import CalendarPicker from 'react-native-calendar-picker';

import { connect } from 'react-redux';

// Import components
import Listing from '../components/Listing'


var moment = require('moment'); // require
moment.locale ('fr');

function DetailResa(props) {

   let nextPage = () => {
     if(props.user.token){
        props.navigation.navigate('Paiement');
     } else {
        props.navigation.navigate('SignIn', {navigation: props.navigation});
     }
    }

    let listingFilter = props.preStataires.filter(elem => elem.name === props.selectPresta)


    var listPresta = props.listPrestations.map((item, index) => {
        return(
            <View key={index} style={styles.containerList}>
                    <View style={styles.container}>
                        <Text style={styles.Text}>{item.name}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.Text,{marginRight:5}]}>{item.prix}€</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: '#7241DB' }} />
                </View>
        )});

        var sumPrix = 0;
        for(var i = 0; i < props.listPrestations.length; i++){
            sumPrix += props.listPrestations[i].prix;
        }


    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.header}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons name='chevron-back' size={30} color='black' onPress={() => { props.navigation.goBack(null) }}/> Détail de la réservation</Text>
            </View>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
            <View style={{marginTop:20}}>
                <Listing disable='true'  name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
            </View>
            <View style={styles.container2}>

                <Text style={styles.title}>
                    Prestation(s) selectionnée(s)
                </Text>
                {listPresta}
                <View style={styles.container}>
                    <View></View>
                    <Text style={[styles.Text,{marginRight:5,fontWeight:'bold'}]}>Total : {sumPrix}€</Text>
                </View>
                <Text style={[styles.title,{marginTop:10}]}>
                    Date
                </Text>

                <View style={{flexDirection:'row', marginTop:10, justifyContent:'space-between', marginBottom:50}}>
                <Entypo name="calendar" size={24} color="#7241DB" />
                <Text style={{fontSize:20}}>{props.selectCreneau[0]}</Text>
                <Text style={{fontSize:20}}>{props.selectCreneau[1]}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <View style={{width:'50%'}}>
                    <Button  buttonStyle={{ backgroundColor: '#7241DB'}} radius="20" onPress={() =>  nextPage()}>Confirmer</Button>
                    </View>
                </View>
            </View>
            </ScrollView>
        </View>
     
    );
      };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header:{
        marginTop: 50,
        marginLeft: 20,
    },
    data_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
      },
      data_container2:{
        flexDirection:'row',
        marginRight:10,
      },
      title:{
        fontSize:20, 
        fontWeight:'bold',
        marginBottom:10,
      },
      Text:{
        fontSize:15,
        marginBottom:10,
        marginTop:10,
      },
      sous_text:{
        fontSize:10,
      },
      container2:{
        marginTop:20,
        marginLeft:20,
        marginRight:20,
      },
      container:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:10
        },
  });
 

  function mapStateToProps(state) {
    return { preStataires: state.prestataires,
             listPrestations: state.listPrestations,
             selectPresta: state.selectPresta,
             selectCreneau: state.selectCreneau,
             user: state.infoUser
              }
  }


  export default connect(
    mapStateToProps,
    null
  )(DetailResa);
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, StatusBar } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche

import { Button, Overlay, Icon } from '@rneui/base';

// Import des icones 
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';

const ip = "192.168.0.25";


import { Divider, Tab } from 'react-native-elements';


import { connect } from 'react-redux';


function Paiement(props) {


    const [visible, setVisible] = useState(false);

    var addResa = async (token, horaire, date, name, prix, listPresta) => {
      console.log(listPresta)
        let response = await fetch(`http://${ip}:3000/add-reservation`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${token}&date=${date}&name=${name}&prix=${prix}&horaire=${horaire}&listPresta=${JSON.stringify(listPresta)}`,
        });
        let responseJson = await response.json();
        console.log(responseJson)
        if (responseJson == true) {
          setVisible(!visible)
          }else{
          }
    };

    var sumPrix = 0;
    for(var i = 0; i < props.listPrestations.length; i++){
        sumPrix += props.listPrestations[i].prix;
    }



    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.header}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons name='chevron-back' size={30} color='black' onPress={() => { props.navigation.goBack(null) }}/> Paiement</Text>
            </View>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
            <View style={[styles.container2,{marginTop:'50%'}]}>
                <View style={{ alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:'50%'}}>
                    <Button  buttonStyle={{ backgroundColor: '#7241DB'}} radius="20" onPress={() => {addResa(props.user.token, props.selectCreneau[1], props.selectCreneau[0],props.selectPresta, sumPrix, props.listPrestations)}}>Payer</Button>
                    </View>
                </View>
                <Overlay overlayStyle={[{backgroundColor: 'white', height:'30%', borderRadius:20 , width:'70%'}]} isVisible={visible} onBackdropPress={() => props.navigation.navigate('Home')}>
                    
                    <View style={{alignItems:'center', justifyContent:'space-between'}}>

                        <Text style={[styles.title,{margin:20}]}>Felicitation !</Text>
                        <Text style={[styles.Text,{margin:5}]}>
                            Votre réservation a été validée.
                        </Text>
                        
                        <LottieView style={{width:'30%'}} source={require('../assets/confirmation.json')} autoPlay='true' />
                        <View style={{margin:20, flexDirection:'row'}}>
                        <Button
                        buttonStyle={{marginRight:20}}
                            radius="20"
                            title="Accueil"
                            onPress={() => props.navigation.navigate('Home')}
                        />
                        <Button
                            radius="20"
                            title="Réservations"
                            onPress={() => {props.navigation.navigate('Reservation'), setVisible(!visible)}}
                        />
                        </View>
                        
                    </View>
                    </Overlay>
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
  )(Paiement);
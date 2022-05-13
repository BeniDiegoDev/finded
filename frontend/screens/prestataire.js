import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche
import { SearchBar, Avatar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones pour la navbar
import { Ionicons } from '@expo/vector-icons';
import { Divider, Tab } from 'react-native-elements';

export default function Prestataire(props) {

    let services = [
      {
        name : "Homme - Coupe de cheveux",
        price : '15€',
      },
      {
        name : "Homme - Coupe de cheveux + Barbe",
        price : '20€',
      },
      {
        name : "Femme - Coupe de cheveux",
        price : '35€',
      },
      {
        name : "Femme - Couleur",
        price : '45€',
      }
    ];

    var listServices = services.map((item, index) => {
        return (
            <View style={styles.containerList} key={index}>
                <View style={styles.container}>
                    <Text style={styles.Text}>{item.name}</Text>
                    <Text style={styles.Text}>{item.price}</Text>
                </View>
                <Divider style={{ backgroundColor: '#7241DB' }} />
            </View>
        )});

      return (
        <View style={{flex:1, backgroundColor:'#fff'}}>

            <Image source={require('../assets/coiffeur.jpeg')} style={{width:'100%', height:'25%'}} />

            <View style={styles.data_container}>

                <View style={{marginLeft:20}}>
                    <Text style={styles.title}>
                        Barber Street 59th
                    </Text>
                    <Text style={styles.text}>
                        134th Street, New York, NY 10001
                    </Text>
                </View>

                <View style={styles.data_container2}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10}}>
                        4.5
                    </Text>
                    <Ionicons name="md-star" size={20} color="#F5B642" style={{marginLeft:10}} />
                </View>
                
            </View>

            <Divider/>
            <View style={styles.container2}>

            <Text style={styles.title}>
            Description
            </Text>

            <Text style={styles.Text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit amet, consectetur adipiscing elit. Sit amet
            </Text>

            <Text style={styles.title}>
            Prestations
            </Text>

            {listServices}

            <View style={{flexDirection:'row', marginRight:20,marginTop:10, justifyContent:'space-between'}}>
                <View>
                </View>
                <View style={styles.button}>
                    <Button color="#7241DB" radius="20">
                        Valider
                    </Button>
                </View>
            </View>
            
            </View>

       </View>
  
      );
  }
  
  
     
    const styles = StyleSheet.create({
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
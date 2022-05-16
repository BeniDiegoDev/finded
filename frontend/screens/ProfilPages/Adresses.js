import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Adresses(props) {

 
    return (
        <View style={styles.container}>
          <View>
            <View style={{marginVertical:40, display:'flex', flexDirection:'row', borderBottomWidth: 1, paddingBottom:30}}>
                <Text style={{fontSize:30}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Mes adresses</Text>
            </View>
            
            <View style={styles.personnal_informations}>
              <View style={styles.adresses_container}>
                  <MaterialCommunityIcons name="home-variant" size={35} color="black" style={{marginRight:10}}/>
                  <View>
                    <Text style={styles.icon}>Domicile</Text>
                    <Text style={[styles.icon, styles.adresses]}>21 rue de Finded - 75017</Text>
                  </View>
              </View>
              <View>
                <Text style={styles.icon}><FontAwesome name="pencil" size={20} color="black" /></Text>
                <Text style={styles.icon}><Ionicons name="trash" size={20} color="black" /></Text>
              </View>
            </View>

            <View style={styles.personnal_informations}>
              <View style={styles.adresses_container}>
              <MaterialIcons name="card-travel" size={35} color="black" style={{marginRight:10}}/>
                  <View>
                    <Text style={styles.icon}>Travail</Text>
                    <Text style={[styles.icon, styles.adresses]}>14 avenue Mongo - 92100</Text>
                  </View>
              </View>
              <View>
                <Text style={styles.icon}><FontAwesome name="pencil" size={20} color="black" /></Text>
                <Text style={styles.icon}><Ionicons name="trash" size={20} color="black" /></Text>
              </View>
            </View>

            <View style={styles.personnal_informations}>
              <View style={styles.adresses_container}>
              <Entypo name="feather" size={30} color="black" style={{marginRight:10}}/>
                  <View>
                    <Text style={styles.icon}>Vacances</Text>
                    <Text style={[styles.icon, styles.adresses]}>3 rue des vacances - 06200</Text>
                  </View>
              </View>
              <View>
                <Text style={styles.icon}><FontAwesome name="pencil" size={20} color="black" /></Text>
                <Text style={styles.icon}><Ionicons name="trash" size={20} color="black" /></Text>
              </View>
            </View>
          </View>

            <View style={{display:'flex', alignItems:'center'}}>
              <Text style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>Ajouter une adresse</Text>
            </View>
        </View>
    );
  
  };

const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:10,
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
        paddingVertical:25,
        paddingHorizontal:10
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
    }

});

  
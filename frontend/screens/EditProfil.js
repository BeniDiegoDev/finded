import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Profil(props) {

 
    return (
        <View style={styles.container}>
            <View style={{marginVertical:40, display:'flex', flexDirection:'row',  justifyContent:'center', borderBottomWidth: 1, paddingBottom:30}}>
                <Text style={{fontSize:35}}>Prénom Nom</Text>
            </View>
            <ListItem style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Avatar
                rounded
                size={100}
                title="PN"
                source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                />
          </ListItem>
          <View style={styles.modify_remove}>
            <Text style={styles.icon}><FontAwesome name="pencil" size={20} color="black"/> Modifier</Text>
            <Text style={styles.icon}><Ionicons name="trash" size={20} color="black" /> Supprimer</Text>
          </View>
          <View style={styles.personnal_informations}>
            <Text style={styles.icon}>Mot de passe</Text>
            <Text style={styles.icon}>***********  <FontAwesome name="pencil" size={20} color="black" /></Text>
          </View>
          <View style={styles.personnal_informations}>
            <Text style={styles.icon}>Téléphone</Text>
            <Text style={styles.icon}>+33 6 53 42 67 98  <FontAwesome name="pencil" size={20} color="black" /></Text>
          </View>
          <View style={styles.personnal_informations}>
            <Text style={styles.icon}>Email</Text>
            <Text style={styles.icon}>prenom.nom@finded.fr  <FontAwesome name="pencil" size={20} color="black"/></Text>
          </View>
          <Button title='Valider' style={styles.button}/>
          
        </View>
    );
  
  };

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20
    },
    icon: {
        marginHorizontal:10,
        fontSize:17
    },
    personnal_informations: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        paddingVertical:30
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

});

  
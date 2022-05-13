import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem, Divider} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Profil() {


  let categories = [
    {
      icon : <Entypo name="home" size={35} color="black" />,
      name : 'Mes adresses',
    },
    {
     icon : <FontAwesome name="calendar-check-o" size={35} color="black" />,
     name : 'Mes réservations',
    },
    {
      icon : <FontAwesome name="credit-card" size={35} color="black" />,
      name : 'Mes cartes',
    },
    {
      icon : <Entypo name="mail" size={35} color="black" />,
      name : 'Mes messages',
    },
    {
      icon : <FontAwesome name="star" size={35} color="black" />,
      name : 'Mes favoris',
    },
    {
      icon : <Entypo name="help" size={35} color="black" />,
      name : 'Aide',
    }
  ];

    return (
        <View style={{paddingTop:40, flex:1, backgroundColor:'#fff'}}>
          <ListItem>
            <Avatar
              rounded
              size={70}
              title="PN"
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            />
            <ListItem.Content>
              <ListItem.Title style={{marginVertical:2, fontSize:20}}>Prénom Nom</ListItem.Title>
              <ListItem.Subtitle style={{marginVertical:2, color:'grey'}}>Éditer mon profil</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <Divider style={{height:2}}/>
  
          {categories.map((item, i) => (
          <ListItem key={i} style={{height:90, display:'flex', justifyContent:'center'}}>
            {item.icon}
            <ListItem.Content>
              <ListItem.Title style={{marginVertical:2, fontSize:20}}>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          ))}

          <ListItem>
            <ListItem.Content style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
              <ListItem.Title style={{marginVertical:2,fontSize:20 }}>Mentions Légales</ListItem.Title>
              <ListItem.Title style={{marginVertical:2, fontSize:20, color:'red'}}>Déconnexion</ListItem.Title>
            </ListItem.Content>
          </ListItem>
     </View>

    );
}


   
  const styles = StyleSheet.create({
    avatar_container:{
      display:'flex',
      flexDirection:'row',
    }

  });
  
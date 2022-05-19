import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Avatar, ListItem, Divider, Button} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Profil(props) {

  const [isLogged, setIsLogged] = useState(true);

  let categories = [
    {
      icon : <Entypo name="home" size={30} color="black" />,
      name : 'Mes adresses',
      url : 'Adresses'
    },
    {
      icon : <FontAwesome name="calendar-check-o" size={30} color="black" />,
      name : 'Mes réservations',
      url : 'Reservations'
    },
    {
      icon : <FontAwesome name="credit-card" size={30} color="black" />,
      name : 'Mon Wallet',
      url : 'Cards'
    },
    {
      icon : <Entypo name="mail" size={30} color="black" />,
      name : 'Mes messages',
      url : 'Messages'
    },
    {
      icon : <FontAwesome name="heart" size={30} color="black" />,
      name : 'Mes favoris',
      url : 'Favoris'
    },
    {
      icon : <Entypo name="help" size={30} color="black" />,
      name : 'Aide',
      url : 'Help'
    }
  ];

  if (isLogged === true) {
    return (
        <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', display:'flex', flexDirection:'column', justifyContent:'space-between', paddingHorizontal:10}}>
          <ListItem>
            <Avatar
              rounded
              size={70}
              title="PN"
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            />
            <ListItem.Content>
              <ListItem.Title style={{marginVertical:2, fontSize:20}}>Prénom Nom</ListItem.Title>
              <ListItem.Subtitle onPress={() => {props.navigation.navigate('EditProfil')}} style={{marginVertical:2, color:'grey'}} >Éditer mon profil</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <Divider style={{height:2}}/>
  
      
          {categories.map((item, i) => (
            <TouchableWithoutFeedback key={i} onPress={() => { props.navigation.navigate(item.url)}}>
              <ListItem style={{height:90, display:'flex', justifyContent:'center'}}>
                {item.icon}
                <ListItem.Content>
                  <ListItem.Title style={{marginVertical:2, fontSize:20}}>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableWithoutFeedback>
          ))}

          <ListItem>
            <ListItem.Content style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <ListItem.Title onPress={() => {props.navigation.navigate('MentionsLegales')}} style={{marginVertical:2,fontSize:15 }}>Mentions Légales</ListItem.Title>
              <ListItem.Title style={{marginVertical:2, fontSize:15, color:'red'}}>Déconnexion</ListItem.Title>
            </ListItem.Content>
          </ListItem>
     </View>
    );
  } else {
    return (
      <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', paddingHorizontal:20, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <View>
            <View style={{marginVertical:100}}>
              <Text style={{fontSize:35}}>Bienvenue !</Text>
            </View>
            <View>
              <Text style={{fontSize:16, marginBottom:60}}>Connectez-vous pour réserver votre prochaine prestation.</Text>
              <Button title="S'identifier"></Button>
              <Text style={{marginTop:60}}>Pas encore membre ?</Text>
              <Text style={{marginTop:15, color:'#7241DB', fontWeight:'bold'}}>S'inscrire</Text>
            </View>
        </View>
      </View>
    );
  
  }
}


   
  const styles = StyleSheet.create({
    avatar_container:{
      display:'flex',
      flexDirection:'row',
    }

  });
  
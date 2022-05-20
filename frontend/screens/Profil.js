import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Avatar, ListItem, Divider, Button, Overlay} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Welcome from '../screens/Welcome';

function Profil(props) {


  logout = () => {
    props.onSubmitDisconnect(props.user);
  }

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

  if (props.user.token) {
    return (
        <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', display:'flex', flexDirection:'column', justifyContent:'space-between', paddingHorizontal:10}}>
          <ListItem>
            <Avatar
              rounded
              size={70}
              title={props.user.firstName.charAt(0).toUpperCase() + props.user.lastName.charAt(0).toUpperCase()}
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            />
            <ListItem.Content>
              <ListItem.Title style={{marginVertical:2, fontSize:20}}>{props.user.firstName} {props.user.lastName}</ListItem.Title>
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
              <ListItem.Title onPress={toggleOverlay} style={{marginVertical:2, fontSize:15, color:'red'}}>Déconnexion</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <View style={{display:'flex', flexDirection:'row', marginVertical:20}}>
                  <Text>Êtes-vous sur de vouloir vous déconnecter ?</Text>
                </View>

      

                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                  <Button onPress={() => logout()} title='Oui' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787'}} />
                  <Button onPress={toggleOverlay} title='Non' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787'}} />
                </View>

              </View>
            </Overlay>
     </View>
    );
  } else {
    return (
      <Welcome navigation={props.navigation}/>
    );
  }
}


   
  const styles = StyleSheet.create({
    avatar_container:{
      display:'flex',
      flexDirection:'row',
    }

  });

  function mapStateToProps(state) {
    return { 
      user: state.infoUser
   }
  }

 
  function mapDispatchToProps(dispatch) {
    return {
      onSubmitDisconnect: function (user) {
        dispatch({type: 'disconnectUser',user})
  }}}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profil);
  
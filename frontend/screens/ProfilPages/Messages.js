import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

export default function Messages(props) {

  var swipeoutBtns = [
    {
      text: 'Supprimer',
      backgroundColor: '#FF0000',
    },
  ]

  let messages = [
    {
      image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      name : 'Nom prestataire',
      last_message : 'Le premier petit ami de France Gall gargouille',
      date_last_message : '12/12/2019',
      hour_last_message : '12:10'
    },
    {
      image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      name : 'Nom prestataire',
      last_message : "vous n'avez pas à mettre le second paramètre ! Il suffit d'indiquer la position du caractère à partir",
      date_last_message : '12/12/2019',
      hour_last_message : '12:10'
    },
    {
      image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      name : 'Nom prestataire',
      last_message : "Le caractère à la position 2 est « z » et comme nous n'avons pas mis de second paramètre, la sous-chaîne ",
      date_last_message : '12/12/2019',
      hour_last_message : '12:10'
    },
    {
      image : 'https://placeimg.com/140/140/any',
      name : 'Nom prestataire',
      last_message : "respectivement en minuscules ou en majuscules. C'est utile si, par exemple, vous souhaitez normaliser toutes les",
      date_last_message : '12/12/2019',
      hour_last_message : '12:10'
    },
  ];

  let messagesList = messages.map((item, index) => {
    return (
      <Swipeout autoClose right={swipeoutBtns} style={{backgroundColor:'white'}} key={index}>
        <TouchableWithoutFeedback onPress={() => { props.navigation.navigate('Conversation') }}>
        <View>
          <View style={styles.messages_container}>
            <View style={styles.infos_container}>
              <Avatar rounded size='large' source={{ uri: `{item.image}`}}/>
              <View style={styles.data}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.job}</Text>
                <Text style={[styles.text, styles.message]}>{item.last_message.slice(0, 20) + "..."}</Text>
              </View>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date}>{item.date_last_message}</Text>
              <Text style={styles.date}>{item.hour_last_message}</Text>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    )
  })

 
    return (
      <View style={styles.container}>
      <View>
        <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
            <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Ma messagerie</Text>
        </View>
            {messagesList}
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
    messages_container:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal : 20,
      marginVertical : 10,
      alignItems:'center',
    },
    infos_container:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    },
    data:{
      marginLeft:10,
    },
    text:{
      fontSize:15,
    },
    message:{
      color:'grey',
      fontStyle:'italic',
    },
    date:{
      fontSize:12,
    },
    date_container:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-end',
    },
});

  
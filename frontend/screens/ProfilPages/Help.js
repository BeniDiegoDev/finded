import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

export default function Help(props) {

  
 
    return (
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
                <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Aide</Text>
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
    }

});

  
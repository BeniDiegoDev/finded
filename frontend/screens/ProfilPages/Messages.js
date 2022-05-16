import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Messages() {

 
    return (
        <View style={styles.container}>
          <Text>Messages</Text> 
        </View>
    );
  
  };

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20
    }
});

  
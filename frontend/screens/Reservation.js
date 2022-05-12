import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Reservation() {
    return (
      <View style={styles.container}>
        <Text>Reservation.js</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
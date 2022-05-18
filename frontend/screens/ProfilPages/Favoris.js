import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

// Import components
import Listing from '../../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

function Favoris(props) {


  let listingFilter = props.preStataires.filter(elem => elem.note >= 1)

  let listing = listingFilter.map((element, i) => {
    return (
        <Listing key={i} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} />
    )
  })
 
    return (
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
                <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Mes Favoris</Text>
            </View>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
              {listing}
            </ScrollView >
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
});

function mapStateToProps(state) {
  return { preStataires: state.prestataires, }
}

export default connect(
  mapStateToProps,
  null
)(Favoris);


  

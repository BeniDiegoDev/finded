import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button,} from 'react-native-elements';

import { connect } from 'react-redux';

function Welcome(props) {


    return (
      <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', paddingHorizontal:20, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <View>
            <View style={{marginVertical:100}}>
              <Text style={{fontSize:35}}>Bienvenue !</Text>
            </View>
            <View>
              <Text style={{fontSize:16, marginBottom:60}}>Connectez-vous pour réserver votre prochaine prestation.</Text>
              <Button onPress={() => props.navigation.navigate('SignIn')} title="S'identifier"></Button>
              <Text style={{marginTop:60}}>Pas encore membre ?</Text>
              <Text onPress={() => props.navigation.navigate('SignUp')} style={{marginTop:15, color:'#7241DB', fontWeight:'bold'}}>S'inscrire</Text>
            </View>
        </View>
      </View>
    );
  
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

 
  
  export default connect(
    mapStateToProps,
    null
  )(Welcome);
  
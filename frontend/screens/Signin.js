import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from "@rneui/base";

import { connect } from "react-redux";


const ip = '192.168.10.164'


function Signin(props) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
 


  let signIn = async (userEmail, password) => {

    if( userEmail && password ) {

    let response = await fetch(`http://${ip}:3000/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userEmail=${userEmail}&password=${password}`
    });

    let responseJson = await response.json();
      if (responseJson.result === true) {
      
        props.navigation.goBack();
        props.onSubmitConnectAccount(responseJson.user);
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect")
      }
  } else {
    Alert.alert("Attention","Veuillez remplir tous les champs")
  }
  }

  return (
    <View style={styles.container}>
      <View
        style={{ marginBottom: 40, display: "flex", flexDirection: "row", justifyContent: "center"}}
      >
        <Text style={{ fontSize: 30, marginTop: 40 }}>
          Bienvenue !
        </Text>
      </View>
      <View style={{marginHorizontal:30, display:'flex', alignItems:'center', maxWidth: 300}}>
              <Text style={{fontSize:17, marginBottom:60, textAlign:'center'}}>Connectez-vous pour réserver votre prochaine prestation.</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
      <Input
          containerStyle={{ marginBottom: 25, width: "80%" }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Email"
          leftIcon={<Icon name="user" size={24} color="grey" />}
          onChangeText={(val) => setUserEmail(val)}
        />
        <Input
          secureTextEntry={true}
          containerStyle={{ marginBottom: 25, width: "80%" }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Mot de passe"
          leftIcon={<FontAwesome5 name="key" size={24} color="grey" />}
          onChangeText={(val) => setPassword(val)}
        />

      <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#7241DB", paddingHorizontal:60}}
        radius="20"
        onPress={() => {
          signIn(userEmail, password);
        }}
      /> 

        <Text style={{ marginTop: 60 }}>Pas encore membre ?</Text>
        <Text
          onPress={() => props.navigation.navigate("SignUp")}
          style={{ marginTop: 15, color: "#7241DB", fontWeight: "bold" }}
        >
          S'inscrire
        </Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 40,
    display:'flex', 
    alignItems:'center',
  },
  searchbar: {
    width: "100%",
    paddingBottom: 10,
  },
});

function mapStateToProps(state) {
  return { 
    user: state.infoUser
 }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitConnectAccount: function (user) {
      dispatch({ type: "connectUser", user });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
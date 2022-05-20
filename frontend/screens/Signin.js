import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';
import { Button } from "@rneui/base";

import { connect } from "react-redux";

const ip = '192.168.10.153'

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
        style={{ marginBottom: 40, display: "flex", flexDirection: "row" }}
      >
        <Text style={{ fontSize: 30, paddingHorizontal: 20 }}>
          <Ionicons
            onPress={() => {
              props.navigation.goBack(null);
            }}
            name="chevron-back"
            size={30}
            color="black"
          />{" "}
          Connexion
        </Text>
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
          containerStyle={{ marginBottom: 25, width: "80%" }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Mot de passe"
          leftIcon={<Icon name="key" size={24} color="grey" />}
          onChangeText={(val) => setPassword(val)}
        />

      <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#7241DB", width: "100%"}}
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
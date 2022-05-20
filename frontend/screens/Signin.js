import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';

import { connect } from "react-redux";

<<<<<<< HEAD
const ip = '192.168.10.153'
=======
const ip = '192.168.10.169'
>>>>>>> 3bf96753bc41167509f1945b8e05a97b5a32d270

function Signin(props) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false)


  let signIn = async (userEmail, password) => {

    if( userEmail && password ) {

    let response = await fetch(`http://${ip}:3000/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `userEmail=${userEmail}&password=${password}`
    });

    let responseJson = await response.json();
      if (responseJson.result === true) {
        setIsLogged(true);
        props.navigation.navigate('Home');
        props.onSubmitConnectAccount(responseJson.user);
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect")
      }
  } else {
    Alert.alert("Attention","Veuillez remplir tous les champs")
  }
  }

  return (
    <View>
      <View
        style={{ marginVertical: 40, display: "flex", flexDirection: "row" }}
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
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Email"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setUserEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Mot de passe"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setPassword(val)}
      />

      <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          signIn(userEmail, password);
        }}
      /> 

      <Text
        onPress={() => {
          props.navigation.navigate("SignUp");
        }}
        style={{ paddingRight: 15, fontWeight: "bold", fontSize: 17 }}
      >
        Pas encore membre ? S'inscrire
      </Text>
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
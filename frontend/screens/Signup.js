import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';

import { connect } from "react-redux";

const ip = '192.168.10.153'

export default function Signup(props) {

  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [isLogged, setIsLogged] = useState(false)

  let addUser = async (firstName, lastName, userEmail, password, confirmPassword, phoneNumber) => {
    
    if( password === confirmPassword ) {
    let response = await fetch(`http://${ip}:3000/users/sign-up`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `firstName=${firstName}&lastName=${lastName}&userEmail=${userEmail}&password=${password}&confirmPassword=${confirmPassword}&phoneNumber=${phoneNumber}`
        });

    let responseJson = await response.json();

    if (responseJson.result === true) {
      setIsLogged(true);
      props.navigation.goBack();
    }
    } else {
      Alert.alert("Attention","Les mots de passe ne correspondent pas");
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
          Créer un compte
        </Text>
      </View>
      <View>
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Prénom"
        onChangeText={(val) => setFirstName(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Nom"
        onChangeText={(val) => setLastName(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Email"
        onChangeText={(val) => setUserEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Numéro de tél"
        onChangeText={(val) => setPhoneNumber(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Mot de passe"
        onChangeText={(val) => setPassword(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Confirmer mot de passe"
        onChangeText={(val) => setConfirmPassword(val)}
      />
      </View>

      <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          addUser(firstName, lastName, userEmail, password, confirmPassword, phoneNumber);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 40,
  },
});
// PEUT ETRE A GERER AVEC TOKEN
// function mapDispatchToProps(dispatch) {
//   return {
//     onSubmitCreateAccount: function (account) {
//       dispatch({ type: "saveAccount", account: account });
//     },
//   };
// }

// export default connect(null, mapDispatchToProps)(Signup);

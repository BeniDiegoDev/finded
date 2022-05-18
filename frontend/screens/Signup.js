import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Prénom"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setFirstName(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Nom"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setLastName(val)}
      />
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
        placeholder="Numéro de tél"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setPhoneNumber(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Mot de passe"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setPassword(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Confirmer mot de passe"
        leftIcon={<Icon name="user" size={24} color="#009788" />}
        onChangeText={(val) => setConfirmPassWord(val)}
      />

      <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("Signin");
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
  searchbar: {
    width: "100%",
    paddingBottom: 10,
  },
});
// PEUT ETRE A GERER AVEC TOKEN
function mapDispatchToProps(dispatch) {
  return {
    onSubmitCreateAccount: function (account) {
      dispatch({ type: "saveAccount", account: account });
    },
  };
}

export default connect(null, mapDispatchToProps)(Signup);

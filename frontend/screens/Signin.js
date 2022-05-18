import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

export function Signin() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValide, setIsValide] = useState(false);

  if (isValide) {
    setIsValide(isValide === true);
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

      {isValide ? (
        <Button
          buttonStyle={{
            backgroundColor: "#7241DB",
            borderColor: "#7241DB",
            borderWidth: 1,
          }}
          radius="20"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "white" }}>Continuer</Text>
        </Button>
      ) : (
        <Button
          buttonStyle={{
            backgroundColor: "white",
            borderColor: "#7241DB",
            borderWidth: 1,
          }}
          radius="20"
        >
          <Text style={{ color: "#7241DB" }}>Continuer</Text>
        </Button>
      )}

      {/* <Button
        title="Continuer"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      /> */}

      <Text
        onPress={() => {
          props.navigation.navigate("Signup");
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
//A GERER AVEC TOKEN
function mapDispatchToProps(dispatch) {
  return {
    onSubmitCreateAccount: function (account) {
      dispatch({ type: "saveAccount", account: account });
    },
  };
}

export default connect(null, mapDispatchToProps)(Signin);

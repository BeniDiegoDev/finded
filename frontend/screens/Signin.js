import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "@rneui/base";

import { connect } from "react-redux";

function Signin(props) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  let signIn = async (userEmail, password) => {
    if (userEmail && password) {

      let response = await fetch(`https://findedbackend.herokuapp.com/users/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userEmail=${userEmail}&password=${password}`,
      });

      let responseJson = await response.json();
      if (responseJson.result === true) {
        props.onSubmitConnectAccount(responseJson.user);
        let reservations = await fetch(`https://findedbackend.herokuapp.com/users/get-reservations/${responseJson.user.token}`)
        let responseResa = await reservations.json()

        props.ShowListReservations(responseResa.reservations);
        props.navigation.goBack();
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect");
      }
    } else {
      Alert.alert("Attention", "Veuillez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: 40,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, marginTop: 40 }}>Bienvenue !</Text>
        </View>

        <View
          style={{
            marginHorizontal: 30,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              marginBottom: 60,
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            Connectez-vous pour r??server votre prochaine prestation.
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            width: "100%",
            minWidth: "100%",
          }}
        >
          <Input
            containerStyle={{ marginBottom: 25, width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Email"
            leftIcon={<Icon name="user" size={24} color="grey" />}
            onChangeText={(val) => setUserEmail(val)}
          />
          <Input
            secureTextEntry={true}
            containerStyle={{ marginBottom: 25, width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Mot de passe"
            leftIcon={<FontAwesome5 name="key" size={24} color="grey" />}
            onChangeText={(val) => setPassword(val)}
          />

          {userEmail && password && password.length >= 8 ? (
            <Button
              title="Continuer"
              type="solid"
              buttonStyle={{
                backgroundColor: "#7241DB",
                paddingHorizontal: 60,
              }}
              radius="20"
              onPress={() => {
                signIn(userEmail, password);
              }}
            >
              Continuer
            </Button>
          ) : (
            <Button
              title="Continuer"
              type="solid"
              buttonStyle={{
                borderColor: "#7241DB",
                backgroundColor: "white",
                borderWidth: 1,
                paddingHorizontal: 60,
              }}
              titleStyle={{ color: "#7241DB" }}
              radius="20"
              onPress={() => {
                Alert.alert("Attention", "Veuillez remplir tous les champs");
              }}
            >
              Continuer
            </Button>
          )}

          <Text style={{ marginTop: 60 }}>Pas encore membre ?</Text>
          <Text
            onPress={() => props.navigation.navigate("SignUp")}
            style={{
              marginTop: 15,
              color: "#7241DB",
              fontWeight: "bold",
              marginBottom: 30,
            }}
          >
            S'inscrire
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    width: "100%",
    paddingBottom: 10,
  },
});

function mapStateToProps(state) {
  return {
    user: state.infoUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitConnectAccount: function (user) {
      dispatch({ type: "connectUser", user });
    },
    ShowListReservations: function (reservations) {
      dispatch({ type: "ShowListReservations", reservations });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

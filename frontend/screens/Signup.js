import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView,KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";

import { connect } from "react-redux";

const ip = "192.168.10.128";

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  let addUser = async (firstName,lastName,userEmail,password,confirmPassword,phoneNumber) => {
    if (firstName && lastName && userEmail && password && confirmPassword && phoneNumber) {
      if (userEmail.includes("@") && userEmail.includes(".")) {
        if (phoneNumber.length === 10) {
          if (password.length >= 8) {
            if (password === confirmPassword) {
              let response = await fetch(`http://${ip}:3000/users/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `firstName=${firstName}&lastName=${lastName}&userEmail=${userEmail}&password=${password}&confirmPassword=${confirmPassword}&phoneNumber=${phoneNumber}`,
              });

              let responseJson = await response.json();
              if (responseJson.error === true) {
                Alert.alert("Erreur", "Email déjà existant");
              } else {
                if (responseJson.result === true) {
                  props.navigation.navigate("Home");
                  props.onSubmitCreateAccount(responseJson.saveUser);
                }
              }
            } else {
              Alert.alert("Attention", "Les mots de passe ne correspondent pas");
            }
          } else {
            Alert.alert(
              "Attention",
              "Le mot de passe doit contenir au moins 8 caractères"
            );
          }
        } else {
          Alert.alert(
            "Attention",
            "Veuillez saisir un numéro de téléphone valide"
          );
        }
      } else {
        Alert.alert(
          "Attention",
          "Veuillez saisir un email valide"
        );
      }
    } else {
      Alert.alert("Attention", "Veuillez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ marginBottom:40, display: "flex", flexDirection: "row" }}
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
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            width: "100%"
          }}
        >
          
          <Input
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Prénom"
            onChangeText={(val) => setFirstName(val)}
          />
          
          <Input
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Nom"
            onChangeText={(val) => setLastName(val)}
          />
          <Input
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Email"
            onChangeText={(val) => setUserEmail(val)}
          />
          <Input
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Numéro de tél"
            onChangeText={(val) => setPhoneNumber(val)}
          />
          <Input
            secureTextEntry={true}
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Mot de passe"
            onChangeText={(val) => setPassword(val)}
          />
          <Input
            secureTextEntry={true}
            containerStyle={{ marginBottom: 25, width: "80%" }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Confirmer mot de passe"
            onChangeText={(val) => setConfirmPassword(val)}
          />
          
          <View>
            <Button
              buttonStyle={{ backgroundColor: "#7241DB", width: "100%" }}
              radius="20"
              onPress={() => {
                addUser(
                  firstName,
                  lastName,
                  userEmail,
                  password,
                  confirmPassword,
                  phoneNumber
                );
              }}
            >
              <Text style={{ color: "#fff", fontSize: 17 }}
              >
                Continuer
              </Text>
            </Button>
            
          </View>

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
  },
});

function mapStateToProps(state) {
  return {
    user: state.infoUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitCreateAccount: function (user) {
      dispatch({ type: "createUser", user });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

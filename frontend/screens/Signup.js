import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons, Zocial, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import Checkbox from "expo-checkbox";

import { connect } from "react-redux";

 ;

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptCondition, setAcceptCondition] = useState(false);

  let addUser = async (
    firstName,
    lastName,
    userEmail,
    password,
    confirmPassword,
    phoneNumber
  ) => {
    if (
      firstName &&
      lastName &&
      userEmail &&
      password &&
      confirmPassword &&
      phoneNumber
    ) {
      if (userEmail.includes("@") && userEmail.includes(".")) {
        if (phoneNumber.length === 10) {
          if (password.length >= 8) {
            if (password === confirmPassword) {
              let response = await fetch(`https://findedbackend.herokuapp.com/users/sign-up`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
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
              Alert.alert(
                "Attention",
                "Les mots de passe ne correspondent pas"
              );
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
        Alert.alert("Attention", "Veuillez saisir un email valide");
      }
    } else {
      Alert.alert("Attention", "Veuillez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
        <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Créer un compte</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View
          style={{
            alignItems: "center",
            width: "100%",
            marginTop: 30
          }}
        >
          <Input
            containerStyle={{ marginBottom: 25, width: "75%" }}
            leftIcon={<Icon name="user" size={24} color="grey" />}
            inputStyle={{
              marginLeft: 10,
              // borderStartWidth : 0.5,
              // borderStartWidth : 0.5,
              // borderTopWidth : 0.5,
              // boderLeftWidth: 0.5,
              // borderRightWidth: 0.5,
            }}
            placeholder="Prénom"
            onChangeText={(val) => setFirstName(val)}
          />

          <Input
            containerStyle={{ marginBottom: 25, width: "75%" }}
            leftIcon={<Icon name="user" size={24} color="grey" />}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Nom"
            onChangeText={(val) => setLastName(val)}
          />
          <Input
            containerStyle={{ marginBottom: 25, width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            leftIcon={<Zocial name="email" size={24} color="grey" />}
            // leftIcon={<Icon name="send" size={24} color="grey" />} //AU CHOIX
            placeholder="Email"
            onChangeText={(val) => setUserEmail(val)}
          />
          <Input
            containerStyle={{ marginBottom: 25, width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            leftIcon={<MaterialIcons name="phone-iphone" size={24} color="grey" />}
            placeholder="Numéro de tél"
            onChangeText={(val) => setPhoneNumber(val)}
          />
          <Input
            secureTextEntry={true}
            containerStyle={{ marginBottom: 25, width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            leftIcon={<FontAwesome5 name="key" size={24} color="grey" />}
            placeholder="Mot de passe"
            onChangeText={(val) => setPassword(val)}
          />
          <Input
            secureTextEntry={true}
            containerStyle={{ width: "75%" }}
            inputStyle={{ marginLeft: 10 }}
            leftIcon={<FontAwesome5 name="key" size={24} color="grey" />}
            placeholder="Confirmer mot de passe"
            onChangeText={(val) => setConfirmPassword(val)}
          />

          <View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={acceptCondition}
                onValueChange={setAcceptCondition}
                style={styles.checkbox}
              />
              <Text style={styles.label}>
                J'accepte les <Text style={{ color: "#7241DB" }} onPress={() => { props.navigation.navigate('MentionsLegales') }}>mentions légales</Text>
              </Text>
            </View>
            {acceptCondition ? (
              <Button
                buttonStyle={{ backgroundColor: "#7241DB", marginBottom: 30 }}
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
                Continuer
              </Button>
            ) : (
              <Button
                buttonStyle={{ borderColor: '#7241DB', backgroundColor: 'white', borderWidth: 1, marginBottom: 30 }}
                titleStyle={{ color: "#7241DB" }}
                radius="20"
                onPress={() => {
                  Alert.alert(
                    "Attention",
                    "Veuillez accepter les conditions d'utilisations"
                  );
                }}
              >
                Continuer
              </Button>
            )}
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
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
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

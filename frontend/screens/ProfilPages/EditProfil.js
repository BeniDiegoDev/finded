import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { ListItem, Avatar, Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function EditProfil(props) {

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);

  let modifyPhoneNumber = async (phoneNumber) => {
    if (phoneNumber.length === 10) {
      let response = await fetch(`https://findedbackend.herokuapp.com/users/update-phoneNumber`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.user.token}&phoneNumber=${phoneNumber}`,
      });
      let responseJson = await response.json();
      if (responseJson.result === true) {
        toggleOverlay();
      }
    } else {
      Alert.alert(
        "Attention",
        "Veuillez saisir un numéro de téléphone valide"
      );
      setPhoneNumber(props.user.phoneNumber);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, paddingBottom: 30 }}>
        <Text style={{ fontSize: 30 }}>{props.user.firstName} {props.user.lastName}</Text>
      </View>
      <ListItem style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Avatar
          rounded
          size={100}
          title={props.user.firstName.charAt(0).toUpperCase() + props.user.lastName.charAt(0).toUpperCase()}
          source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
        />
      </ListItem>
      <View style={styles.modify_remove}>
        <Text style={{}}>Modifier</Text>
      </View>
      <View style={styles.personnal_informations}>
        <Text style={styles.icon}>Mot de passe</Text>
        <Text style={styles.icon}>***********  <FontAwesome name="pencil" size={20} color="black" /></Text>
      </View>
      <View style={styles.personnal_informations}>
        <Text style={styles.icon}>Téléphone</Text>
        <Text style={styles.icon}>{phoneNumber}  <FontAwesome name="pencil" size={20} color="black" onPress={toggleOverlay} /></Text>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ borderRadius: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 20 }}>
            <Text style={{ fontSize: 17 }}>Modification du numéro de téléphone</Text>
          </View>
          <View>
            <TextInput
              style={{ borderBottomWidth: 1, borderColor: 'grey', padding: 10, width: 250, marginBottom: 20 }}
              placeholder="Nouveau numéro de téléphone..."
              onChangeText={(val) => setPhoneNumber(val)} />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <Button onPress={toggleOverlay} title='Annuler' buttonStyle={{ width: 90, marginHorizontal: 10, backgroundColor: '#3DA787', borderRadius: 20 }} />
            <Button onPress={() => modifyPhoneNumber(phoneNumber)} title='Valider' buttonStyle={{ width: 90, marginHorizontal: 10, backgroundColor: '#7241DB', borderRadius: 20 }} />
          </View>

        </View>
      </Overlay>

      <View style={styles.personnal_informations}>
        <Text style={styles.icon}>Email</Text>
        <Text style={styles.icon}>{props.user.email}  <FontAwesome name="pencil" size={20} color="black" /></Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button title='Valider' buttonStyle={styles.validate} onPress={() => props.navigation.navigate('Profil')} />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  icon: {
    marginHorizontal: 10,
    fontSize: 17
  },
  personnal_informations: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 30
  },
  modify_remove: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingVertical: 30
  },
  validate: {
    marginTop: 40,
    backgroundColor: '#7241DB',
    borderRadius: 20,
    width: 200,
  },

});

function mapStateToProps(state) {
  return {
    user: state.infoUser
  }
}




export default connect(
  mapStateToProps,
  null
)(EditProfil);

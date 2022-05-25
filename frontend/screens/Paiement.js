import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';

import { Button, Overlay } from '@rneui/base';

// Import des icones 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

const ip = "192.168.10.149";



function Paiement(props) {

  const [card, setCard] = useState({})
  const [cardSelected, setCardSelected] = useState(false)

  let payment = [
    {
      title: 'Carte Perso',
      icon: 'cc-visa',
      type: 'visa',
      number: '**** **** 4242',
      expiration: '12/25',
    },
    {
      title: 'Carte Beni',
      icon: 'cc-mastercard',
      type: 'mastercard',
      number: '**** **** 2509',
      expiration: '10/26',
    },
    {
      title: 'Paypal Perso',
      icon: 'paypal',
      type: 'paypal',
      number: '',
      expiration: '',
    },
  ];

  let paymentList = payment.map((item, i) => {
    if (item.title == card.title) {
      return (
        <TouchableOpacity key={i} onPress={() => (setCard({}), setCardSelected(false))}>
          <View style={[styles.personnal_informations, { borderRadius: 20, borderColor: "#7241DB", borderWidth: 1 }]}>
            <View style={styles.adresses_container}>
              <FontAwesome name={item.icon} size={35} color="#3DA787" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.icon}>{card.title}</Text>
                <Text style={[styles.icon, styles.adresses]}>{card.type}</Text>
              </View>
            </View>
            <View style={styles.cards_infos}>
              <Text style={styles.icon}>{card.number}</Text>
              <Text style={styles.icon}>{card.expiration}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity key={i} onPress={() => (setCard(item), setCardSelected(true))}>
          <View style={[styles.personnal_informations, { opacity: 0.5 }]}>
            <View style={styles.adresses_container}>
              <FontAwesome name={item.icon} size={35} color="#7241DB" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.icon}>{item.title}</Text>
                <Text style={[styles.icon, styles.adresses]}>{item.type}</Text>
              </View>
            </View>
            <View style={styles.cards_infos}>
              <Text style={styles.icon}>{item.number}</Text>
              <Text style={styles.icon}>{item.expiration}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  });

  const [visible, setVisible] = useState(false);

  var addResa = async (token, horaire, date, name, prix, listPresta) => {

    let response = await fetch(`http://${ip}:3000/add-reservation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&date=${date}&name=${name}&prix=${prix}&horaire=${horaire}&listPresta=${JSON.stringify(listPresta)}`,
    });
    let responseJson = await response.json();

    if (responseJson.result == true) {

      props.onAddReservation(responseJson.reservation)
      setVisible(!visible)
    } else {
    }
  };

  var sumPrix = 0;
  for (var i = 0; i < props.listPrestations.length; i++) {
    sumPrix += props.listPrestations[i].prix;

  }



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.header}>
        <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons name='chevron-back' size={30} color='black' onPress={() => { props.navigation.goBack(null) }} /> Paiement</Text>
      </View>

      <View style={[styles.container2]}>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <View style={{ width: '100%' }}>
            {paymentList}
          </View>

          <View style={{ width: '50%', marginTop: 40 }}>

            {cardSelected ?

              <Button
                buttonStyle={{ backgroundColor: '#7241DB' }}
                radius="20"
                onPress={() => { addResa(props.user.token, props.selectCreneau[1], props.selectCreneau[0], props.selectPresta, sumPrix, props.listPrestations) }}
              >
                Payer
              </Button>

              :

              <Button
                buttonStyle={{ borderColor: '#7241DB', backgroundColor: 'white', borderWidth: 1 }}
                titleStyle={{ color: "#7241DB" }}
                radius="20"
                onPress={() => {
                  Alert.alert(
                    "Attention",
                    "Veuillez selectionner un moyen de paiement"
                  );
                }}>
                Payer
              </Button>
            }

          </View>

        </View>

        <Overlay overlayStyle={[{ backgroundColor: 'white', height: '30%', borderRadius: 20, width: '70%' }]} isVisible={visible} onBackdropPress={() => props.navigation.navigate('Home')}>

          <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>

            <Text style={[styles.title, { margin: 20 }]}>Felicitation !</Text>

            <Text style={[styles.Text, { margin: 5 }]}>
              Votre réservation a été validée.
            </Text>

            <LottieView style={{ width: '30%' }} source={require('../assets/confirmation.json')} autoPlay='true' />

            <View style={{ margin: 20, flexDirection: 'row' }}>
              <Button
                buttonStyle={{ marginRight: 20, borderRadius: 20, backgroundColor: '#7241DB' }}
                title="Accueil"
                onPress={() => props.navigation.navigate('Home')}
              />
              <Button
                buttonStyle={{ borderRadius: 20, backgroundColor: '#7241DB' }}
                title="Réservations"
                onPress={() => { props.navigation.navigate('Reservation'), setVisible(!visible) }}
              />
            </View>

          </View>
        </Overlay>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    marginLeft: 20,
  },
  data_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  data_container2: {
    flexDirection: 'row',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Text: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  sous_text: {
    fontSize: 10,
  },
  container2: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  personnal_informations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginVertical: 5,
    paddingHorizontal: 20
  },
  adresses_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cards_infos: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'space-between',
  }
});

function mapDispatchToProps(dispatch) {
  return {
    onAddReservation: (reservation) => dispatch({ type: 'onAddReservation', reservation })
  }
}



function mapStateToProps(state) {
  return {
    preStataires: state.prestataires,
    listPrestations: state.listPrestations,
    selectPresta: state.selectPresta,
    selectCreneau: state.selectCreneau,
    user: state.infoUser
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paiement);

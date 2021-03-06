import React, { useState } from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Button, Overlay, Divider } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



// Import components
import Listing from '../../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

const FirstRoute = (props) => {



  const [visible, setVisible] = useState(false);
  const [cancelId, setCancelId] = useState('')

  let showDelete = (item) => {
    setVisible(!visible)
    if (visible) {
      setCancelId(item)
    } else {
      setCancelId('')
    }
  }

  let listEnCours = props.EnCours.filter(e => e.status === 'En cours').map((elem, i) => {

    let cancelReservation = async (id) => {

      let response = await fetch(`https://findedbackend.herokuapp.com/cancel-reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}&token=${props.user.token}`,
      })
      let responseJson = await response.json();

      if (responseJson === true) {
        props.deleteReducer(id)
        setVisible(!visible)
      }

    }

    let listingFilter = props.prestataires.filter(resa => resa.name === elem.name)

    var listPresta = elem.prestations.map((prestation, index) => {
      return (
        <View key={index}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
            <View>
              <Text>{prestation.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{prestation.prix}€</Text>
            </View>
          </View>
        </View>
      )
    });


    if (listingFilter.length != 0) {
      return (

        <View key={i} style={{ flexDirection: 'column', marginBottom: 20 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{elem.date} à</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {elem.horaire}</Text>
            </View>
            <View style={{ margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{elem.prix} €</Text>
            </View>
          </View>

          <View>
            <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} number={listingFilter[0].number} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
          </View>

          <View style={{ margin: 10 }}>
            {listPresta}
          </View>

          <TouchableWithoutFeedback onPress={() => showDelete(elem._id)} >
            <View style={{ alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 40 }}>
                <Text style={{ color: '#7241DB', fontWeight: 'bold' }} >Annuler la réservation</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {cancelId == elem._id ?

            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button onPress={() => { cancelReservation(elem._id) }} title='Oui' buttonStyle={{ width: 90, marginHorizontal: 10, backgroundColor: '#7241DB', borderRadius: 20 }} />
                <Button title='Non' buttonStyle={{ width: 90, marginHorizontal: 10, backgroundColor: '#3DA787', borderRadius: 20 }} onPress={() => setCancelId('')} />
              </View>
            </View>

            : null}

          <Divider style={{ marginTop: 20 }} />
        </View>

      )
    }
  }
  )

  let enCours = props.EnCours.filter(resa => resa.status == 'En cours')

  if (enCours.length <= 0) {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 150 }}>
        <AntDesign name="calendar" size={150} color="#c2c2c2" />
        <Text style={{ color: '#c2c2c2', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>Finded</Text>
        <Text style={{ color: '#c2c2c2', fontSize: 20, marginVertical: 20 }}>Pas de réservation en cours</Text>
      </View>
    )
  } else {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listEnCours}
        </ScrollView>
      </View>
    );
  }


}

const SecondRoute = (props) => {

  const [prestaRating, setPrestaRating] = useState(3)

  var tabPrestaRating = []
  for (var i = 0; i < 5; i++) {
    var starColor = "star-o"
    if (i < prestaRating) {
      starColor = 'star'
    }
    let count = i + 1
    tabPrestaRating.push(<FontAwesome onPress={() => setPrestaRating(count)} name={starColor} size={24} color='#f1c40f' style={{ marginHorizontal: 5 }} />)
  }

  const [visible, setVisible] = useState(false);
  const [cancelId, setCancelId] = useState('');

  const [tableauVoted, setTableauVoted] = useState([])

  let showNotation = (item) => {
    setVisible(!visible)
    if (visible) {
      setCancelId(item)
    } else {
      setCancelId('')
    }
  }

  const [isNoted, setIsNoted] = useState(false)

  let listTerminee = props.Terminees.filter(e => e.status === 'Terminée').map((elem, i) => {

    let listingFilter = props.prestataires.filter(resa => resa.name === elem.name)

    var listPresta = elem.prestations.map((prestation, index) => {
      return (
        <View key={index}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
            <View>
              <Text>{prestation.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{prestation.prix}€</Text>
            </View>
          </View>
        </View>
      )
    });

    if (listingFilter.length != 0) {
      return (

        <View key={i} style={{ flexDirection: 'column', marginBottom: 20 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{elem.date} à</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {elem.horaire}</Text>
            </View>
            <View style={{ margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{elem.prix} €</Text>
            </View>
          </View>

          <View>
            <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} number={listingFilter[0].number} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
          </View>

          <View style={{ margin: 10 }}>
            {listPresta}
          </View>

          {tableauVoted != elem._id ?
            <TouchableWithoutFeedback onPress={() => showNotation(elem._id)} >
              <View style={{ alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 40 }}>
                  <Text style={{ color: '#7241DB', fontWeight: 'bold' }} >Noter la prestation</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            :
            <View style={{ alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 40 }}>
                <Text style={{ color: '#7241DB', fontWeight: 'bold' }} >Merci pour votre avis !</Text>
              </View>
            </View>
          }



          {cancelId == elem._id ?

            <View style={{ padding: 20 }}>
              <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                  {tabPrestaRating}
                </View>
                <TextInput style={{ borderWidth: 1, height: 100, borderColor: '#7241DB', borderRadius: 20, paddingHorizontal: 10, paddingTop: 10, marginBottom: 30, textAlignVertical: 'top' }}
                  placeholder="Ajouter un commentaire..."
                  multiline={true}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Button title='Annuler' buttonStyle={{ width: 120, marginHorizontal: 10, backgroundColor: '#3DA787', borderRadius: 20 }} onPress={() => setCancelId('')} />
                  <Button onPress={() => { showNotation(elem._id), setIsNoted(true), setTableauVoted([...tableauVoted, elem._id]) }} title='Valider' buttonStyle={{ width: 120, marginHorizontal: 10, backgroundColor: '#7241DB', borderRadius: 20 }} />
                </View>
              </View>
            </View>

            : null}

          <Divider style={{ marginTop: 20 }} />
        </View>

      )
    }
  }
  )

  let finished = props.Terminees.filter(resa => resa.status == 'Terminée')

  if (finished.length <= 0) {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 150 }}>
        <AntDesign name="calendar" size={150} color="#c2c2c2" />
        <Text style={{ color: '#c2c2c2', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>Finded</Text>
        <Text style={{ color: '#c2c2c2', fontSize: 20, marginVertical: 20 }}>Pas de réservation terminée</Text>
      </View>
    )
  } else {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listTerminee}
        </ScrollView>
      </View>
    );
  }


}

const ThirdRoute = (props) => {


  let listAnnulees = props.Annulees.filter(e => e.status === 'Annulée').map((item, index) => {

    let listingFilter = props.prestataires.filter(elem => elem.name === item.name)

    var listPresta = item.prestations.map((prestation, index) => {
      return (
        <View key={index}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View>
              <Text>{prestation.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{prestation.prix}€</Text>
            </View>
          </View>
        </View>
      )
    });

    if (listingFilter.length != 0) {
      return (

        <View key={index} style={{ flexDirection: 'column', marginBottom: 20 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.date} à</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {item.horaire}</Text>
            </View>
            <View style={{ margin: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.prix} €</Text>
            </View>
          </View>

          <View>
            <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} number={listingFilter[0].number} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
          </View>

          <View style={{ margin: 15 }}>
            {listPresta}
          </View>

          <Divider />
        </View>
      )
    }
  })


  let annulees = props.Annulees.filter(resa => resa.status == 'Annulée')

  if (annulees.length <= 0) {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 150 }}>
        <AntDesign name="calendar" size={150} color="#c2c2c2" />
        <Text style={{ color: '#c2c2c2', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>Finded</Text>
        <Text style={{ color: '#c2c2c2', fontSize: 20, marginVertical: 20 }}>Pas de réservation annulée</Text>
      </View>
    )
  } else {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listAnnulees}
        </ScrollView>
      </View>
    );
  }
}

function Reservations(props) {



  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute deleteReducer={props.onDeleteReservation} user={props.user} navigation={props.navigation} prestataires={props.preStataires} EnCours={props.meeting} />;
      case 'second':
        return <SecondRoute user={props.user} navigation={props.navigation} prestataires={props.preStataires} Terminees={props.meeting} />;
      case 'third':
        return <ThirdRoute user={props.user} navigation={props.navigation} prestataires={props.preStataires} Annulees={props.meeting} />;
    }
  };


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'En cours' },
    { key: 'second', title: 'Terminées' },
    { key: 'third', title: 'Annulées' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#7241DB' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? '#7241DB' : 'black', fontSize: 17 }}>{route.title}</Text>
      )}

    />
  );


  if (props.user.token) {


    return (

      <View style={styles.container}>
        <View style={{ marginVertical: 40, flexDirection: 'row' }}>
          <Text style={{ fontSize: 30, paddingHorizontal: 10 }}><Ionicons onPress={() => { props.navigation.goBack() }} name="chevron-back" size={30} color="black" /> Mes réservations</Text>
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          test='valeur'
        />
      </View>

    )

  } else {

    return (
      <View style={{ paddingTop: 40, flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

        <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={{ paddingRight: 15, fontSize: 30 }}> Mes Réservations</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AntDesign name="calendar" size={150} color="#3DA787" />
          <Text style={{ color: '#7241DB', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>Finded</Text>
          <Text style={{ fontSize: 20, marginVertical: 20 }}>Vos réservations apparaîtront ici</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text onPress={() => props.navigation.navigate('SignIn')} style={{ marginBottom: 20, color: '#7241DB', fontWeight: 'bold', fontSize: 15 }}>S'identifier</Text>
          <Text onPress={() => props.navigation.navigate('SignUp')} style={{ marginBottom: 20, color: '#7241DB', fontWeight: 'bold', fontSize: 15 }}>Créer un compte</Text>
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  infos: {
    fontSize: 17,
    marginVertical: 2
  }

});

function mapStateToProps(state) {
  return {
    preStataires: state.prestataires,
    user: state.infoUser,
    listPrestations: state.listPrestations,
    selectPresta: state.selectPresta,
    selectCreneau: state.selectCreneau,
    meeting: state.listReservations,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ShowListReservations: function (reservations) {
      dispatch({ type: "ShowListReservations", reservations });
    },
    onDeleteReservation: function (id) {
      dispatch({ type: "onDeleteReservation", id });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservations);

import React, {useState, useEffect} from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, Image} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Button, Overlay,Divider } from 'react-native-elements';
import { Card } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Import components
import Listing from '../../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Config IP pour connexion avec le backend
const ip = "192.168.10.128"



const FirstRoute = (props) => {

  
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  

  let listEnCours = props.EnCours.map((item, i) => {

    let listingFilter = props.prestataires.filter(elem => elem.name === item.name)
    
    var listPresta = item.prestations.map((prestation, index) => {
      return(
          <View key={index}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:5}}>
                    <View>
                        <Text>{prestation.name}</Text>
                    </View>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>{prestation.prix}€</Text>
                      </View>
                  </View>
              </View>
      )});

    if(listingFilter.length != 0){
      return(

          <View key={i} style={{flexDirection:'column', marginBottom:20}}>
            
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.date} à</Text>
                  <Text style={{fontSize:17, fontWeight:'bold'}}> {item.horaire}</Text>
                </View>
                <View style={{margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.prix} €</Text>
                </View>
              </View>
          
              <View>
                <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
              </View>

              <View style={{margin:15}}>
                {listPresta}
              </View>


            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{borderRadius:20}}>
              <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <Text style={{fontSize:17}}>Annuler le rendez-vous</Text>

                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                  <Button title='Oui' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#7241DB', borderRadius:20}}/>
                  <Button onPress={toggleOverlay} title='Non' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787', borderRadius:20}} />
                </View>

              </View>
            </Overlay>
            <Divider/>
          </View>
          
    )
    } else {

      return(

        <View>
          <Text>Pas de réservation</Text>
        </View>
         ) 
    }
  })

  return(
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {listEnCours}
          </ScrollView>
        </View>
  );

}

const SecondRoute = (props) => {

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let listTerminees = props.Terminees.map((item, i) => {

    let listingFilter = props.prestataires.filter(elem => elem.name === item.name)
    
    var listPresta = item.prestations.map((prestation, index) => {
      return(
          <View key={index}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:5}}>
                    <View>
                        <Text>{prestation.name}</Text>
                    </View>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>{prestation.prix}€</Text>
                      </View>
                  </View>
              </View>
      )});

    if(listingFilter.length != 0){
      return(

          <View key={i} style={{flexDirection:'column', marginBottom:20}}>
            
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.date} à</Text>
                  <Text style={{fontSize:17, fontWeight:'bold'}}> {item.horaire}</Text>
                </View>
                <View style={{margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.prix} €</Text>
                </View>
              </View>
          
              <View>
                <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
              </View>

              <View style={{margin:15}}>
                {listPresta}
              </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{borderRadius:20}}>
              <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <Text style={{fontSize:17}}>Annuler le rendez-vous</Text>

                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                  <Button title='Oui' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#7241DB', borderRadius:20}}/>
                  <Button onPress={toggleOverlay} title='Non' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787', borderRadius:20}} />
                </View>

              </View>
            </Overlay>
            <Divider/>
          </View>
          

    )
    } else {
        
        return(
  
          <View>
          <Text>Pas de réservation</Text>
        </View>
          ) 
      }
  })

  return(
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {listTerminees}
          </ScrollView>
        </View>
  );

}

const ThirdRoute = (props) => {

  let listAnnulees = props.Annulees.map((item, index) => {

    let listingFilter = props.prestataires.filter(elem => elem.name === item.name)
    
    var listPresta = item.prestations.map((prestation, index) => {
      return(
          <View key={index}>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:5}}>
                    <View>
                        <Text>{prestation.name}</Text>
                    </View>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>{prestation.prix}€</Text>
                      </View>
                  </View>
              </View>
      )});

    if(listingFilter.length != 0){
      return(

          <View key={i} style={{flexDirection:'column', marginBottom:20}}>
            
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.date} à</Text>
                  <Text style={{fontSize:17, fontWeight:'bold'}}> {item.horaire}</Text>
                </View>
                <View style={{margin:15}}>
                  <Text style={{fontSize:17, fontWeight:'bold'}}>{item.prix} €</Text>
                </View>
              </View>
          
              <View>
                <Listing navigation={props.navigation} name={listingFilter[0].name} images={listingFilter[0].images} address={listingFilter[0].address} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
              </View>

              <View style={{margin:15}}>
                {listPresta}
              </View>

            <Divider/>
          </View>
    )
    } else {
      return(
        <View>
          <Text>Pas de réservation</Text>
        </View>
      )
    }
  })


  return(
        <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listAnnulees}
        </ScrollView>
        </View>
  );
}



function Reservations(props) {

  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    console.log('tewt');
    async function loadData() {
      let reservations = await fetch(`http://${ip}:3000/users/get-reservations/${props.user.token}`)
      let responseResa = await reservations.json()
      setMeeting(responseResa.reservations)

    }
    loadData()
  }, []);
  


  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute navigation= {props.navigation} prestataires = {props.preStataires} EnCours = {meeting.filter(e => e.status ==='En cours')} />;
      case 'second':
        return <SecondRoute navigation= {props.navigation} prestataires = {props.preStataires} Terminees = {meeting.filter(e => e.status ==='Terminée')} />;
      case 'third':
        return <ThirdRoute navigation= {props.navigation} prestataires = {props.preStataires} Annulees = {meeting.filter(e => e.status ==='Annulée')} />;
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
      style={{ backgroundColor: 'white'}}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? '#7241DB' : 'black', fontSize:17}}>{route.title}</Text>
      )}

    />
  );


  if (props.user.token) {

  return (
    
      <View style={styles.container}>
        <View style={{marginVertical:40, flexDirection:'row'}}>
            <Text style={{fontSize:30, paddingHorizontal:10}}><Ionicons onPress={() => { props.navigation.goBack()}} name="chevron-back" size={30} color="black"/> Mes réservations</Text>
        </View> 
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          test = 'valeur'
        />
      </View>
      
  )

  } else {

    return (
      <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
       
            <View style={{marginVertical:10}}>
              <Text style={{fontSize:30}}>Réservations</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <AntDesign name="calendar" size={150} color="#3DA787" />
              <Text style={{color: '#7241DB', fontWeight: 'bold',fontStyle: 'italic',textAlign: 'center',fontSize: 20}}>Finded</Text>
              <Text style={{fontSize:20, marginVertical:20}}>Vos réservations apparaîtront ici</Text>
            </View>
        
        <View style={{alignItems:'center'}}>
          <Text onPress={() => props.navigation.navigate('SignIn')} style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>S'identifier</Text>
          <Text onPress={() => props.navigation.navigate('SignUp')}style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>Créer un compte</Text>
        </View> 
      </View>
    );
  
  }
}

const styles = StyleSheet.create({
  container:{
      paddingTop:10,
      flex:1,
      backgroundColor:'#fff',
      flexDirection:'column',
      justifyContent:'space-between'
  },
  infos:{
    fontSize:17,
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
  }
}

export default connect(
  mapStateToProps,
  null
)(Reservations);

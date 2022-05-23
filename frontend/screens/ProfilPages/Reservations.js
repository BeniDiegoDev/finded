import React, {useState, useEffect} from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, Image} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Button, Overlay } from 'react-native-elements';
import { Card } from '@rneui/themed';


import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Import components
import Listing from '../../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'



let meeting = [
  { type: 'Terminées', 
    hour: '8h00',
    date: '10 avril',
    year : '2022',
    nature: 'Coiffure homme',
    name: 'Beni Coiffure',
    job: 'Coiffeur',
    price: '35 €'
  },
  { type: 'Terminées', 
    hour: '8h00',
    date: '10 avril',
    year : '2022',
    nature: 'Coiffure homme',
    name: 'Beni Coiffure',
    job: 'Coiffeur',
    price: '35 €'
  },
  { type: 'En cours', 
    hour: '10h00',
    date: '19 juin',
    year : '2022',
    nature: 'Soin visage',
    name: 'Stg martin',
    job: 'Visagiste',
    price: '45 €'
  },
  { type: 'En cours', 
    hour: '8h00',
    date: '10 avril',
    year : '2022',
    nature: 'Coiffure homme',
    name: 'Beni Coiffure',
    job: 'Coiffeur',
    price: '35 €'
  },
  { type: 'Annulées', 
    hour: '10h00',
    date: '19 juin',
    year: '2022',
    nature: 'Soin visage',
    name: 'Stg martin',
    job: 'Visagiste',
    price: '45 €'
},
{ type: 'Annulées', 
  hour: '8h00',
  date: '10 avril',
  year: '2022',
  nature: 'Coiffure homme',
  name: 'Beni Coiffure',
  job: 'Coiffeur',
  price: '35 €'
  },
  { type: 'Terminées', 
  hour: '8h00',
  date: '10 avril',
  year : '2022',
  nature: 'Coiffure homme',
  name: 'Beni Coiffure',
  job: 'Coiffeur',
  price: '35 €'
},
{ type: 'Terminées', 
  hour: '8h00',
  date: '10 avril',
  year : '2022',
  nature: 'Coiffure homme',
  name: 'Beni Coiffure',
  job: 'Coiffeur',
  price: '35 €'
},
{ type: 'En cours', 
  hour: '10h00',
  date: '19 juin',
  year : '2022',
  nature: 'Soin visage',
  name: 'Stg martin',
  job: 'Visagiste',
  price: '45 €'
},
{ type: 'En cours', 
  hour: '8h00',
  date: '10 avril',
  year : '2022',
  nature: 'Coiffure homme',
  name: 'Beni Coiffure',
  job: 'Coiffeur',
  price: '35 €'
},
{ type: 'Annulées', 
  hour: '10h00',
  date: '19 juin',
  year: '2022',
  nature: 'Soin visage',
  name: 'Stg martin',
  job: 'Visagiste',
  price: '45 €'
},
{ type: 'Annulées', 
hour: '8h00',
date: '10 avril',
year: '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'En cours', 
hour: '10h00',
date: '19 juin',
year : '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'En cours', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Annulées', 
hour: '10h00',
date: '19 juin',
year: '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'Annulées', 
hour: '8h00',
date: '10 avril',
year: '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'En cours', 
hour: '10h00',
date: '19 juin',
year : '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'En cours', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Annulées', 
hour: '10h00',
date: '19 juin',
year: '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'Annulées', 
hour: '8h00',
date: '10 avril',
year: '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Terminées', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'En cours', 
hour: '10h00',
date: '19 juin',
year : '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'En cours', 
hour: '8h00',
date: '10 avril',
year : '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
{ type: 'Annulées', 
hour: '10h00',
date: '19 juin',
year: '2022',
nature: 'Soin visage',
name: 'Stg martin',
job: 'Visagiste',
price: '45 €'
},
{ type: 'Annulées', 
hour: '8h00',
date: '10 avril',
year: '2022',
nature: 'Coiffure homme',
name: 'Beni Coiffure',
job: 'Coiffeur',
price: '35 €'
},
]

const FirstRoute = (props) => {

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };


  
  let listEnCours = props.EnCours.map((item, index) => {
    return(

      <TouchableWithoutFeedback onPress={toggleOverlay} key={index}>
          <View key={index} style={{display:'flex', flexDirection:'column', paddingVertical:20, borderBottomWidth:0.2, borderColor:'grey'}}>
            
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.hour}</Text>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.date}</Text>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.year}</Text>
                </View>
                <View>
                  <Text style={styles.infos}>{item.price}</Text>
                </View>
              </View>
            
            

              <View style={{marginTop:20}}>
                <Card id={props.id} navigation={props.navigation} name={props.name} number={props.number} images={props.images} address={props.address} zipcode={props.zipcode} city={props.city} note={props.note} nbeval={props.nbeval}
                  containerStyle={{ padding: 0, borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row' }} >
                      <Image
                          style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 120, width: 120 }}
                          source={{ uri: props.images }}
                      />
                      <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '60%' }}>
                          <Text style={{ fontSize: 17 }}>{props.name}</Text>
                          <Text >{props.number} {props.address}</Text>
                          <Text >{props.zipcode} {props.city}</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                              <Text style={{ fontSize: 10}}>({props.nbeval} Avis) </Text><Text style={{ fontSize: 17, fontWeight: 'bold'}}> {props.note} <Ionicons name="md-star" size={17} color="#F5B642" /></Text>
                          </View>
                      </View>
                  </View>
                </Card>
              </View>

              <View>
                <Text style={styles.infos}>Prestation 1</Text>
                <Text style={styles.infos}>Prestation 2</Text>
              </View>

    
         

          

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <Text style={{fontSize:17}}>Annuler le rendez-vous</Text>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                  <Button title='Oui' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#7241DB'}}/>
                  <Button onPress={toggleOverlay} title='Non' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787'}} />
                </View>

              </View>
            </Overlay>

          </View>
          
      </TouchableWithoutFeedback>
    )
  })


  return(
        <View style={{ flex: 1, paddingHorizontal:20}}>
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

  let listTerminees = props.Terminees.map((item, index) => {
    return(  
      <TouchableWithoutFeedback onPress={toggleOverlay} key={index}>
      <View key={index} style={{display:'flex', flexDirection:'column', paddingVertical:20, borderBottomWidth:0.2, borderColor:'grey'}}>
            
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <View style={{display:'flex', flexDirection:'row'}}>
                <Text style={[styles.infos, {marginHorizontal:5}]}>{item.hour}</Text>
                <Text style={[styles.infos, {marginHorizontal:5}]}>{item.date}</Text>
                <Text style={[styles.infos, {marginHorizontal:5}]}>{item.year}</Text>
              </View>
              <View>
                <Text style={styles.infos}>{item.price}</Text>
              </View>
            </View>
          
          

            <View style={{marginTop:20}}>
              <Card id={props.id} navigation={props.navigation} name={props.name} number={props.number} images={props.images} address={props.address} zipcode={props.zipcode} city={props.city} note={props.note} nbeval={props.nbeval}
                containerStyle={{ padding: 0, borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }} >
                    <Image
                        style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 120, width: 120 }}
                        source={{ uri: props.images }}
                    />
                    <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '60%' }}>
                        <Text style={{ fontSize: 17 }}>{props.name}</Text>
                        <Text >{props.number} {props.address}</Text>
                        <Text >{props.zipcode} {props.city}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 10}}>({props.nbeval} Avis) </Text><Text style={{ fontSize: 17, fontWeight: 'bold'}}> {props.note} <Ionicons name="md-star" size={17} color="#F5B642" /></Text>
                        </View>
                    </View>
                </View>
              </Card>
            </View>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20}}>
                <Text style={{fontSize:17}}>Noter la prestation</Text>
                <View style={{display:'flex', flexDirection:'row', marginVertical:20}}>
                  <AntDesign name="star" size={24} color="yellow" style={{marginHorizontal:5}}/>
                  <AntDesign name="star" size={24} color="yellow" style={{marginHorizontal:5}}/>
                  <AntDesign name="star" size={24} color="yellow" style={{marginHorizontal:5}}/>
                  <AntDesign name="star" size={24} color="grey" style={{marginHorizontal:5}}/>
                  <AntDesign name="star" size={24} color="grey" style={{marginHorizontal:5}}/>
                </View>

                <TextInput 
                  style ={{borderWidth:1, borderColor:'grey', borderRadius:5, padding:10, width:200, marginVertical:20, minHeight:40}}
                  placeholder="Écrivez votre commentaire"
                  multiline={true}
                >
                </TextInput>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                  <Button onPress={toggleOverlay} title='Valider' buttonStyle={{width:90, marginHorizontal: 10, backgroundColor:'#3DA787'}} />
                </View>

              </View>
            </Overlay>

          </View>
          </TouchableWithoutFeedback>
    )
  })


  return(
        <View style={{ flex: 1, paddingHorizontal:20}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {listTerminees}
          </ScrollView>
        </View>
  );
}

const ThirdRoute = (props) => {

  let listAnnulees = props.Annulees.map((item, index) => {
    return(
      <View key={index} style={{display:'flex', flexDirection:'column', paddingVertical:20, borderBottomWidth:0.2, borderColor:'grey'}}>
            
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.hour}</Text>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.date}</Text>
                  <Text style={[styles.infos, {marginHorizontal:5}]}>{item.year}</Text>
                </View>
                <View>
                  <Text style={styles.infos}>{item.price}</Text>
                </View>
              </View>
            
            

              <View style={{marginTop:20}}>
                <Card id={props.id} navigation={props.navigation} name={props.name} number={props.number} images={props.images} address={props.address} zipcode={props.zipcode} city={props.city} note={props.note} nbeval={props.nbeval}
                  containerStyle={{ padding: 0, borderRadius: 10, marginTop: 0, marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row' }} >
                      <Image
                          style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 120, width: 120 }}
                          source={{ uri: props.images }}
                      />
                      <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '60%' }}>
                          <Text style={{ fontSize: 17 }}>{props.name}</Text>
                          <Text >{props.number} {props.address}</Text>
                          <Text >{props.zipcode} {props.city}</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                              <Text style={{ fontSize: 10}}>({props.nbeval} Avis) </Text><Text style={{ fontSize: 17, fontWeight: 'bold'}}> {props.note} <Ionicons name="md-star" size={17} color="#F5B642" /></Text>
                          </View>
                      </View>
                  </View>
                </Card>
              </View>
      </View>
    )
  })


  return(
        <View style={{ flex: 1, paddingHorizontal:20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listAnnulees}
        </ScrollView>
        </View>
  );
}
 

function Reservations(props) {
 

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute  EnCours = {meeting.filter(e => e.type ==='En cours')} />;
      case 'second':
        return <SecondRoute Terminees = {meeting.filter(e => e.type ==='Terminées')} />;
      case 'third':
        return <ThirdRoute  Annulees = {meeting.filter(e => e.type ==='Annulées')} />;
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
        <View style={{marginVertical:40, display:'flex', flexDirection:'row'}}>
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
      <View style={{paddingTop:40, flex:1, backgroundColor:'#fff', paddingHorizontal:20, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
       
            <View style={{marginVertical:10}}>
              <Text style={{fontSize:30}}>Réservations</Text>
            </View>
            <View style={{display:'flex', alignItems:'center'}}>
              <AntDesign name="calendar" size={150} color="#3DA787" />
              <Text style={{color: '#7241DB', fontWeight: 'bold',fontStyle: 'italic',textAlign: 'center',fontSize: 20}}>Finded </Text>
              <Text style={{fontSize:20, marginVertical:20}}>Vos réservations apparaîtront ici</Text>
            </View>
        
        <View style={{display:'flex', alignItems:'center'}}>
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
      display:'flex',
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
    user: state.infoUser
  }
}

export default connect(
  mapStateToProps,
  null
)(Reservations);

import React, {useState} from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, Image} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Button, Overlay } from 'react-native-elements';
import { Card } from '@rneui/themed';


import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



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
          <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:20, borderBottomWidth:1, borderColor:'grey'}}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginRight:20}}>
                <AntDesign name="calendar" size={35} color="#7241DB" style={{marginBottom:10}} />
                <Text style={styles.infos}>{item.hour}</Text>
                <Text style={styles.infos}>{item.date}</Text>
                <Text style={styles.infos}>{item.year}</Text>
              </View>

              <View>
                <Text style={styles.infos}>{item.nature}</Text>
                <Text style={styles.infos}>{item.name}</Text>
                <Text style={styles.infos}>{item.job}</Text>
              </View>

    
            </View>

            <View>
              <Text style={styles.infos}>{item.price}</Text>
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
      <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:20, borderBottomWidth:1, borderColor:'grey'}}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginRight:20}}>
                <AntDesign name="calendar" size={35} color="green" style={{marginBottom:10}}/>
                <Text style={styles.infos}>{item.hour}</Text>
                <Text style={styles.infos}>{item.date}</Text>
                <Text style={styles.infos}>{item.year}</Text>
              </View>

              <View>
                <Text style={styles.infos}>{item.nature}</Text>
                <Text style={styles.infos}>{item.name}</Text>
                <Text style={styles.infos}>{item.job}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.infos}>{item.price}</Text>
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
      <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:20, borderBottomWidth:1, borderColor:'grey'}}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginRight:20}}>
                <AntDesign name="calendar" size={35} color="red" style={{marginBottom:10}}/>
                <Text style={styles.infos}>{item.hour}</Text>
                <Text style={styles.infos}>{item.date}</Text>
                <Text style={styles.infos}>{item.year}</Text>
              </View>

              <View>
                <Text style={styles.infos}>{item.nature}</Text>
                <Text style={styles.infos}>{item.name}</Text>
                <Text style={styles.infos}>{item.job}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.infos}>{item.price}</Text>
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
 

export default function Reservations(props) {

  const [isLogged, setIsLogged] = useState(true);

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


  if (isLogged === true) {

  return (
    
      <View style={styles.container}>
        <View style={{marginVertical:40, display:'flex', flexDirection:'row'}}>
            <Text style={{fontSize:30, paddingHorizontal:10}}><Ionicons onPress={() => { props.navigation.goBack(null)}} name="chevron-back" size={30} color="black"/> Mes réservations</Text>
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
          <Text style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>S'identifier</Text>
          <Text style={{marginBottom:20, color: '#7241DB', fontWeight:'bold', fontSize:15}}>Créer un compte</Text>
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

import React from 'react';
import { View, useWindowDimensions, Text, StyleSheet, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

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

  let listEnCours = props.EnCours.map((item, index) => {
    return(
    <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:40}}>
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
          </View>
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

  let listTerminees = props.Terminees.map((item, index) => {
    return(  
    <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:40}}>
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
          </View>
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
    <View key={index} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:40}}>
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

  return (
    
      <View style={styles.container}>
        <View style={{marginVertical:40, display:'flex', flexDirection:'row'}}>
            <Text style={{fontSize:30, paddingHorizontal:20}}><Ionicons onPress={() => { props.navigation.goBack(null)}} name="chevron-back" size={30} color="black"/> Mes réservations</Text>
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
      
  );
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
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, StatusBar } from 'react-native';

// Import de SafeAreaView pour ne pas etre gené par la barre haute par defaut du telephone
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de la barre de recherche
import { SearchBar, Avatar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones 
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Divider, Tab } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';


var moment = require('moment'); // require
moment.locale ('fr');


export default function App(props) {
    const [selectedStartDate, setSelectedStartDate] = useState(null)
  
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const maDate = new Date(startDate)  
    const todayDate = new Date()

    let slots = [ 
                '10h - 11h',
                '11h - 12h',
                '12h - 13h',
                '13h - 14h',
                '14h - 15h',
                '15h - 16h',
                '16h - 17h',]
    
    const [state, setState] = useState(-1);
    if( maDate.toLocaleDateString("fr")!=='Invalid Date'){
        var listSlots = slots.map((slot,i) => {
            
            var onClick = () => {
                setState(i);
            }
            
            return (
                <View key={i} style={{margin:5, width:'30%'}}>
                    {state == i ? <Button buttonStyle={{ backgroundColor: '#7241DB'}} radius="20" onPress={()=>(slotsPress(i),onClick())}>{slot}</Button>:
                    <Button radius="20" onPress={()=>(slotsPress(i),onClick())}>{slot}</Button>}
                </View>
            )});
    }
    const[slotSelected, setSlotSelected] = useState('');
    var slotsPress = (i) => {
        setSlotSelected(slots[i])
        console.log(slotSelected)
    }

    console.log(slotSelected)

     useEffect(() => {
             setSlotSelected('')
             setState(-1)
            }, [selectedStartDate]);

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.header}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons name='chevron-back' size={30} color='black' onPress={() => { props.navigation.goBack(null) }}/> Choix du créneau</Text>
            </View>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
            <Card
            containerStyle={{ padding: 0, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row' }} >
                    <Image
                        style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 100, width: 100 }}
                        source={require('../assets/coiffeur.jpeg')}
                    />
                    <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '65%' }}>
                        <Text style={styles.fontsize}>Barber Street 59th</Text>
                        <Text >134th Street, New York, NY 10001</Text>
                        <Text >New York</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10 }}>4.5</Text>
                        <Ionicons name="md-star" size={17} color="#F5B642" style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </View>
            </Card>
            <View style={styles.container2}>

                <Text style={styles.title}>
                    Prestation(s) selectionnée(s)
                </Text>
                <View style={styles.containerList}>
                    <View style={styles.container}>
                        <Text style={styles.Text}>Homme - Coupe de cheveux + Barbe</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.Text,{marginRight:5}]}>25€</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: '#7241DB' }} />
                </View>
                <Text style={[styles.title,{marginTop:10}]}>
                    Choisir une date
                </Text>

                <CalendarPicker
                onDateChange={(date) => setSelectedStartDate(date)}
                showDayStragglers='true'
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
                months={['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']}
                previousTitle="Précedent"
                nextTitle="Suivant"
                todayBackgroundColor="#d3d3d3"
                selectedDayColor="#7241DB"
                minDate={todayDate}
                />
                <Text style={[styles.title,{marginTop:10}]}>
                    { maDate.toLocaleDateString('fr')==='Invalid Date' ?null:'Choisir un créneau' }
                </Text>
                <View style={{width:'100%',flexDirection:'row', flexWrap:'wrap'}}>
                {listSlots}
                </View>
                <View style={{marginLeft:0, marginTop:10, alignItems:'center'}}>
                    <Text style={styles.title}> 
                        { slotSelected==='' ?null:moment(maDate).format('LL') +' de ' + slotSelected}                   
                    </Text> 
                    <View style={{width:'50%', marginBottom:20}}>
                    { slotSelected==='' ? null :<Button  buttonStyle={{ backgroundColor: '#7241DB'}} radius="20" onPress={() => { props.navigation.navigate('DatePicker') }}>Réserver</Button>
                   }                   
                    </View>
                </View>

            </View>
            </ScrollView>
        </View>
     
    );
      };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header:{
        marginTop: 50,
        marginLeft: 20,
    },
    data_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
      },
      data_container2:{
        flexDirection:'row',
        marginRight:10,
      },
      title:{
        fontSize:20, 
        fontWeight:'bold',
        marginBottom:10,
      },
      Text:{
        fontSize:15,
        marginBottom:10,
        marginTop:10,
      },
      sous_text:{
        fontSize:10,
      },
      container2:{
        marginTop:20,
        marginLeft:20,
        marginRight:20,
      },
      container:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:10
        },
  });
 
import React, { useEffect, useState, useRef } from 'react';
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

import { connect } from 'react-redux';

// Import components
import Listing from '../components/Listing'


var moment = require('moment'); // require
moment.locale ('fr');

function DatePicker(props) {
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
                    <Button radius="20" buttonStyle={{ backgroundColor: '#3DA787'}} onPress={()=>(slotsPress(i),onClick())}>{slot}</Button>}
                </View>
            )});
    }

    
  const[slotSelected, setSlotSelected] = useState('');
  
  var slotsPress = (i) => {
        setSlotSelected(slots[i])
  
    }

 
    const scrollViewRef = useRef();

     useEffect(() => {
             setSlotSelected('')
             setState(-1)
             var scrollBottom = () => scrollViewRef.current.scrollToEnd({ animated: true })
             scrollBottom()
            }, [selectedStartDate]);

    let listingFilter = props.preStataires.filter(elem => elem.name === props.selectPresta)


    var listPresta = props.listPrestations.map((item, index) => {
        return(
            <View key={index} style={styles.containerList}>
                    <View style={styles.container}>
                        <Text style={styles.Text}>{item.name}</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.Text,{marginRight:5}]}>{item.prix} €</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: '#7241DB' }} />
                </View>
        )});

        var sumPrix = 0;
        for(var i = 0; i < props.listPrestations.length; i++){
            sumPrix += props.listPrestations[i].prix;
        }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.header}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons name='chevron-back' size={30} color='black' onPress={() => { props.navigation.goBack(null) }}/> Choix du créneau</Text>
            </View>

            <ScrollView style={{ width: '100%' }} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} showsVerticalScrollIndicator={false} >
            
            <View style={{marginTop:20}}>
                <Listing disable='true' name={listingFilter[0].name} images={listingFilter[0].images} number={listingFilter[0].number} address={listingFilter[0].address} zipcode={listingFilter[0].zipcode} city={listingFilter[0].city} note={listingFilter[0].note} nbeval={listingFilter[0].nbeval} />
            </View>
            
            <View style={styles.container2}>

                <Text style={styles.title}>
                    Prestation(s) selectionnée(s)
                </Text>
                {listPresta}
                <View style={{ alignItems: 'flex-end'}}>
                    <Text style={[styles.Text,{marginRight:5,fontWeight:'bold'}]}>Total : {sumPrix} €</Text>
                </View>
                <Text style={[styles.title,{marginTop:5}]}>
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
                    { slotSelected==='' ? null :<Button  buttonStyle={{ backgroundColor: '#7241DB'}} radius="20" onPress={() => { props.navigation.navigate('DetailResa'), props.addCreneau(moment(maDate).format('LL'), slotSelected) }}>Suivant</Button>}                   
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
        marginBottom:5,
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
 

  function mapStateToProps(state) {
    return { preStataires: state.prestataires,
             listPrestations: state.listPrestations,
             selectPresta: state.selectPresta,
              }
  }

  function mapDispatchToProps(dispatch) {
    return {
      addCreneau: function (date, slot) {
        dispatch({
          type: 'addCreneau',
          date : date,
          slot : slot
        })
  }}}


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DatePicker);
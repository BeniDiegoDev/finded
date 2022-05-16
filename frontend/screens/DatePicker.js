import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';

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


export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedStartDate: null,
      };
      this.onDateChange = this.onDateChange.bind(this);
    }
  
    onDateChange(date) {
      this.setState({
        selectedStartDate: date,
      });
    }
    render() {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      const maDate = new Date(startDate)

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

                <CalendarPicker
                onDateChange={this.onDateChange}
                showDayStragglers='true'
                weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
                months={['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']}
                previousTitle="Précedent"
                nextTitle="Suivant"
                todayBackgroundColor="#d3d3d3"
                selectedDayColor="#7241DB"
                />
                <View style={{alignItems:'center', marginTop:10}}>
                <Text style={styles.title}>{ maDate.toLocaleDateString("fr")==='Invalid Date' ?'':moment(maDate).format('LL') }</Text>
                </View>


            </View>
            </ScrollView>
        </View>
     
    );
    }   };
  
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
 
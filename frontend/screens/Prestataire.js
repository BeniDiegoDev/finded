import React, { useState } from 'react';
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

export default function Prestataire(props) {

    let services = [
      {
        name : "Homme - Coupe de cheveux",
        price : '15€',
      },
      {
        name : "Homme - Coupe de cheveux + Barbe",
        price : '20€',
      },
      {
        name : "Femme - Coupe de cheveux",
        price : '35€',
      },
      {
        name : "Femme - Couleur",
        price : '45€',
      }
    ];

    let avis = [
      {
        name : "Pierre Richard",
        avis : 'Très bon salon, très professionnel et très sympathique. Je recommande !',
        note : 4, 
        date: '12/12/2020',
      },
      {
        name : "Bertrand Tom",
        avis : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
        note : 4.5, 
        date: '12/12/2020',
      },
      {
        name : "Constance Dupont",
        avis : 'Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        note : 3.5, 
        date: '12/12/2020',
      },
      {
        name : "Charles André",
        avis : 'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing',
        note : 5,
        date: '12/12/2020',
      },
      {
        name : "Stéphane Rotshild",
        avis : 'Vive la viennoisette !',
        note : 2,
        date: '12/12/2020',
      },
    ];

    const [compteur, setCompteur] = useState(0);
 
    var listServices = services.map((item, index) => {
          const [state, setState] = useState(false);
          var onClick = () => {
            if(state === false){
              setCompteur(compteur + 1);
            }else{
              setCompteur(compteur - 1);
            }
            setState(!state);
            
          }
        return (
            <View style={styles.containerList} key={index}>
                <View style={styles.container}>
                    <Text style={styles.Text}>{item.name}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={[styles.Text,{marginRight:5}]}>{item.price}</Text>
                      {state?<Feather name="minus-circle" size={24} color="#7241DB" onPress={()=>onClick()} />:
                      <Entypo name="circle-with-plus" size={24} color="#7241DB" onPress={()=>onClick()} />}
                    </View>
                </View>
                <Divider style={{ backgroundColor: '#7241DB' }} />
            </View>
        )});
    
    var listAvis = avis.map((item, index) => {
      return(
        <View style={{width:'100%'}} key={index}>
          <View style={{flexDirection:'row', marginTop:10}}>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{marginLeft:10}}>{item.date}</Text>
          </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={[styles.Text,{width:'80%'}]}>{item.avis}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontWeight:'bold', marginRight:5}}>{item.note}</Text>
              <Ionicons name="ios-star" size={24} color="#F5B642" />
            </View>
            </View>


          <Divider style={{ backgroundColor: '#7241DB' }} />
        </View>
      )});

      return (
        <View style={{flex:1, backgroundColor:'#fff'}}>

            <Image source={require('../assets/coiffeur.jpeg')} style={{width:'100%', height:'25%'}} />

            <View style={styles.data_container}>

                <View style={{marginLeft:20}}>
                    <Text style={styles.title}>
                        Barber Street 59th
                    </Text>
                    <Text style={styles.text}>
                        134th Street, New York, NY 10001
                    </Text>
                </View>

                <View style={styles.data_container2}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10}}>
                        4.5
                    </Text>
                    <Ionicons name="md-star" size={20} color="#F5B642" style={{marginLeft:10}} />
                </View>
                
            </View>

            <Divider/>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
              <View style={styles.container2}>

              <Text style={styles.title}>
              Description
              </Text>

              <Text style={styles.Text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit amet, consectetur adipiscing elit. Sit amet
              </Text>

              <Text style={styles.title}>
              Prestations
              </Text>

              {listServices}

              <View style={{flexDirection:'row', marginRight:20,marginTop:10, justifyContent:'space-between'}}>
                  <View>
                  </View>
                  <View style={styles.button}>
                    {compteur!== 0? 
                      <Button buttonStyle={{
                        backgroundColor: '#7241DB',
                        borderColor: '#7241DB',
                        borderWidth: 1,
                      }} radius="20">
                          <Text style={{color:"white"}}>
                            Valider
                          </Text>
                      </Button>:
                      <Button buttonStyle={{
                        backgroundColor: 'white',
                        borderColor: '#7241DB',
                        borderWidth: 1,
                      }} radius="20">
                          <Text style={{color:"#7241DB"}}>
                            Valider
                          </Text>
                      </Button>}

                  </View>
              </View>

              <Text style={styles.title}>
              Avis clients
              </Text>
              
              {listAvis}
              </View>
            </ScrollView>

       </View>
  
      );
  }
  
  
     
    const styles = StyleSheet.create({
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

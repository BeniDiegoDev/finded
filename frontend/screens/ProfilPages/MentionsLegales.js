import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function Help(props) {

  
 
    return (
        <View style={styles.container}>
            <View style={{display:'flex', flexDirection:'row', paddingBottom:30}}>
                <Text style={{fontSize:30, marginHorizontal:10}}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null)}}/> Mentions Légales</Text>
            </View>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false} >
            <View style={{marginHorizontal:20}}>
                <Text>
                En vigueur au 18/05/2022
                Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l""Utilisateur", du site finded.com , ci-après le "Site", les présentes mentions légales.
                La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
                Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».
                </Text>
                <Text style={{marginVertical:10, fontWeight:'bold'}}>ARTICLE 1 - L'EDITEUR</Text>
                <Text>
                L'édition du Site est assurée par Finded SA au capital de 1000000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 362521879 dont le siège social est situé au 56 BD PEREIRE 75017 PARIS,
                Numéro de téléphone 0676345344,
                Adresse e-mail : contact@finded.com.
                N° de TVA intracommunautaire : FR 53 157896342 Le Directeur de la publication est FindedCorp. ci-après l'"Editeur".
                </Text>
                <Text style={{marginVertical:10, fontWeight:'bold'}}>ARTICLE 2 - L'HEBERGEUR</Text>
                <Text>
                L'hébergeur du Site est la société OVH, dont le siège social est situé au PARIS , avec le numéro de téléphone : 0635649327 + adresse mail de contact
                </Text>
                <Text style={{marginVertical:10, fontWeight:'bold'}}>ARTICLE 3 - ACCES AU SITE</Text>
                <Text>
                Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
                En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.
                </Text>
                <Text style={{marginVertical:10, fontWeight:'bold'}}>ARTICLE 4 - COLLECTE DES DONNEES</Text>
                <Text>
                Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.


                En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :
                · par mail à l'adresse email contact@finded.com
                Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
                </Text>

            </View>
            </ScrollView>
        </View>
    );
  
  };

const styles = StyleSheet.create({
    container:{
      paddingTop:50,
      flex:1,
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    }

});

  
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';

// Import de la barre de recherche
import { Slider, Icon } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Import de la Map
import MapView, { Marker, OverlayComponent } from 'react-native-maps';

// Import des picker
import { Picker } from "@react-native-picker/picker";

// Import components
import Listing from '../components/Listing'

function Map(props) {

    const [viewCard, setViewCard] = useState(false)
    const [prestaName, setPrestaName] = useState("")
    const [viewFilter, setViewFilter] = useState(true)
    const [value, setValue] = useState(15)
    const [categorie, setCategorie] = useState("")

    let listingFilter = props.preStataires.filter(elem => elem.name == prestaName)

    let filterList = props.preStataires.filter(elem => elem.categoryName == categorie || "" == categorie )

    console.log(categorie)

    // Affichage grace au resultat du filtre
    let listing = listingFilter.map((element, i) => {
        return (
            <Listing key={i} id={props.id} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
        )
    })

    // const updateSearch = (search) => {
    //     setSearch(search);
    //     if (search == "") {
    //       setViewSearch(false)
    //     } else {
    //       setViewSearch(true)
    //     }
    //   };


    return (
        <View style={styles.container}>

            <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Autour de moi</Text>
            </View>

            <MapView style={styles.map}
                initialRegion={{
                    latitude: props.locaTion.latitude,  // pour centrer la carte
                    longitude: props.locaTion.longitude,
                    latitudeDelta: 0.0922,  // le rayon à afficher à partir du centre
                    longitudeDelta: 0.0421,
                }}
                zoomEnabled={true}
                onPress={() => {setViewCard(false), setPrestaName("")}}
            >
                <Marker coordinate={{ latitude: props.locaTion.latitude, longitude: props.locaTion.longitude }} title="Vous êtes ici" >
                    <Ionicons name='location' size={32} color='#7241DB' />
                </Marker>

                {filterList.map((element, i) => {
                    return (
                        <Marker key={i} coordinate={{ latitude: element.lat, longitude: element.lon }} title={element.name} onPress={() => {setPrestaName(element.name), setViewCard(true)}}>                      
                            <Ionicons name='location' size={32} color='#3DA787' />
                        </Marker>
                    )
                })}


            </MapView>

            {viewFilter ?
                <TouchableWithoutFeedback onPress={() => { setViewCard(false), setViewFilter(false) }} >
                    <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: '14%', right: 20, backgroundColor: 'white', width: 50, height: 50, borderRadius: 10, borderWidth: 2 }}>
                        <Ionicons name="ellipsis-horizontal-outline" size={32} color='#3DA787' />
                    </View>
                </TouchableWithoutFeedback>
                :
                <View style={{ position: 'absolute', alignItems: "center", justifyContent: 'space-between', top: '14%', right: 20, backgroundColor: 'white', width: 300, height: 250, borderRadius: 10, borderWidth: 2 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, paddingLeft: 10, paddingRight: 5 }}>
                        <Text style={{ fontSize: 17}}>Filtrer autour de vous :</Text>
                        <TouchableWithoutFeedback onPress={() => { setViewFilter(true) }} >
                            <Ionicons name='close-outline' size={32} color='#3DA787' />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ width: "90%" }}>
                        <Slider
                            value={value}
                            onValueChange={setValue}
                            maximumValue={100}
                            minimumValue={0}
                            step={5}
                            allowTouchTrack
                            minimumTrackTintColor='#7241DB'
                            maximumTrackTintColor="#3DA787"
                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            thumbStyle={{ height: 25, width: 25, backgroundColor: 'transparent' }}
                            thumbProps={{
                                children: (
                                    <Ionicons name='ellipse' size={25} color='#7241DB' />
                                ),
                            }}
                        />
                        <Text style={{ textAlign: 'right', marginTop: 10 }}>Rechercher {value} km autour de moi</Text>
                    </View>
                    <View style={{ width: '95%' }}>
                        <Picker
                            selectedValue={categorie}
                            onValueChange={(value, index) => setCategorie(value)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Catégorie" value="" />
                            <Picker.Item label="Mécanique" value="Mécanique" />
                            <Picker.Item label="Coiffeur" value="Coiffeur" />
                            <Picker.Item label="Pédicure" value="Pédicure" />
                            <Picker.Item label="Massage" value="Massage" />
                            <Picker.Item label="Baby-Sitting" value="Baby-Sitting" />
                            <Picker.Item label="Peinture" value="Peinture" />
                            <Picker.Item label="Maquillage" value="Maquillage" />
                            <Picker.Item label="Serrurier" value="Serrurier" />
                        </Picker>
                    </View>
                    <Text style={{ fontSize: 17, marginBottom: 10, color: '#7241DB' }} onPress={() => { setCategorie(""), setValue(15) }} >Reinitialiser les filtres</Text>
                </View>
            }

            {viewCard ?
                <View style={{ position: 'absolute', bottom: 0, paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }} >
                    {listing}
                </View>
                :
                <></>
            }


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 40,
    },
    searchbar: {
        width: '100%',
        paddingBottom: 10,
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

function mapStateToProps(state) {
    return { preStataires: state.prestataires, locaTion: state.location }
}

export default connect(
    mapStateToProps,
    null
)(Map);

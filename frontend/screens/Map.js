import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';

// Import de la barre de recherche
import { Slider, Switch } from '@rneui/themed';

// Import des picker
// import { Picker } from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Import de la Map
import MapView, { Circle, Marker } from 'react-native-maps';

// Import components
import Listing from '../components/Listing'

// Import du Swipe Up & Down
import SwipeUpDown from 'react-native-swipe-up-down';

function Map(props) {

    const [viewCard, setViewCard] = useState(false)
    const [prestaName, setPrestaName] = useState("")
    const [viewFilter, setViewFilter] = useState(true)
    const [value, setValue] = useState(1500)
    const [categorie, setCategorie] = useState("")

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Catégorie', value: '' },
        { label: 'Mécanique', value: 'Mécanique' },
        { label: 'Coiffeur', value: 'Coiffeur' },
        { label: 'Pédicure', value: 'Pédicure' },
        { label: 'Massage', value: 'Massage' },
        { label: 'Baby-Sitting', value: 'Baby-Sitting' },
        { label: 'Peintre', value: 'Peintre' },
        { label: 'Estheticienne', value: 'Estheticienne' },
        { label: 'Serrurier', value: 'Serrurier' }
    ]);
    
    const [viewCircle, setViewCircle] = useState(true);
    
    // Convertir la value en KM
    let valueRad = value / 1000

    // Import obligatoire pour haversine (module de calcul en KM de la distance entre l'utilisateur et les divers prestataires)
    var haversine = require("haversine-distance");

    // User geoloc
    var point1 = { lat: props.locaTion.latitude, lng: props.locaTion.longitude }

    // Point a filtrer
    var point2

    // Initialisation du tableau apres filtration par KM
    var resultMarkerRad = []

    // Boucle permettant de calculer les prestataires dans un rayon défini par l'utilisateur
    for (let i = 0; i < props.preStataires.length; i++) {
        point2 = { lat: props.preStataires[i].lat, lng: props.preStataires[i].lon }

        var haversine_m = haversine(point1, point2); //Results in meters (default)
        var haversine_km = haversine_m / 1000; //Results in kilometers

        if (haversine_km < valueRad) {
            resultMarkerRad.push(props.preStataires[i].name)
        }

    }

    let listingFilter = props.preStataires.filter(elem => elem.name == prestaName)

    let filterList = props.preStataires.filter(elem => (elem.categoryName == categorie || "" == categorie) && resultMarkerRad.includes(elem.name))

    let listing = listingFilter.map((element, i) => {
        return (
            <Listing key={i} id={props.id} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
        )
    })

    let listingSwipe = filterList.map((element, i) => {
        return (
            <Listing key={i} id={props.id} navigation={props.navigation} name={element.name} number={element.number} images={element.images} address={element.address} zipcode={element.zipcode} city={element.city} note={element.note} nbeval={element.nbeval} />
        )
    })

    function onTouchMarker(name) {
        setPrestaName(name)
        setViewCard(true)
        setViewFilter(true)
    }

    if (props.locaTion.longitude == null && props.locaTion.latitude == null) {
        return (
            <View style={styles.container}>
                <View style={{ width: '100%', marginTop: 300 }}>
                    <Text style={{ textAlign: 'center' }}>Géolocalisation en cours...</Text>
                    <Text style={{ textAlign: 'center' }}>ou activer votre géolocalisation</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: props.locaTion.latitude,  // pour centrer la carte
                        longitude: props.locaTion.longitude,
                        latitudeDelta: 0.02,  // le rayon à afficher à partir du centre
                        longitudeDelta: 0.05,
                    }}
                    zoomEnabled={true}
                >
                    {viewCircle ? <Circle
                        center={{
                            latitude: props.locaTion.latitude,
                            longitude: props.locaTion.longitude,
                        }}
                        radius={value}
                        strokeWidth={3}
                        strokeColor="rgba(61,167,135,0.3)"
                        fillColor="rgba(61,167,135,0.15)"
                    />
                        :
                        <></>
                    }

                    <Marker coordinate={{ latitude: props.locaTion.latitude, longitude: props.locaTion.longitude }} title="Vous êtes ici" >
                        <Ionicons name='location' size={32} color='#7241DB' />
                    </Marker>

                    {filterList.map((element, i) => {
                        return (
                            <Marker key={i} coordinate={{ latitude: element.lat, longitude: element.lon }} title={element.name} onPress={() => onTouchMarker(element.name)}>
                                <Ionicons name='location' size={32} color='#3DA787' />
                            </Marker>
                        )
                    })}



                </MapView>

                {viewCard ?
                    <View style={{ position: 'absolute', top: 50, alignItems: 'flex-end' }} >
                        {listing}
                        <TouchableWithoutFeedback onPress={() => { setViewCard(false) }} >
                            <View style={{ backgroundColor: 'white', width: 35, height: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginRight: 15, marginBottom: 5 }}>
                                <Ionicons name='close-outline' size={32} color='#7241DB' />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    :
                    <></>
                }
                    
                <SwipeUpDown
                    style={{ backgroundColor: 'white' }}
                    itemMini={() => (
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' , height: 30, marginTop: 2}}>
                                <Ionicons name="chevron-up" size={24} color="black" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15, marginTop: -25}}>
                                <Text style={{ fontSize: 17 }}>Filtrer autour de moi :</Text>
                                <View style={{ alignItems: 'center' }}>
                                <Switch
                                    value={viewCircle}
                                    onValueChange={(value) => setViewCircle(value)}
                                    color='#3DA787'
                                />
                                    {!viewCircle ?
                                        <Text style={{ fontSize: 11, color: '#86939e', marginTop: 5 }}>VOIR LE RAYON QUI M'ENTOURE</Text>
                                        :
                                        <Text style={{ fontSize: 11, color: '#7241DB', marginTop: 5 }}>VOIR LE RAYON QUI M'ENTOURE</Text>
                                    }
                                </View>
                            </View>
                            <View style={{ width: "90%" }}>
                                <Slider
                                    value={value}
                                    onValueChange={setValue}
                                    maximumValue={20000}
                                    minimumValue={500}
                                    step={500}
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
                                <Text style={{ textAlign: 'right' }}>Rechercher {valueRad} km autour de moi</Text>
                            </View>
                        </View>
                    )}
                    itemFull={() => (
                        <View style={{ alignItems: 'center' }}>
                        <Ionicons name="chevron-down" size={24} color="black" />
                            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ fontSize: 17 }}>Filtrer autour de moi :</Text>
                            </View>
                            <View style={{ width: "90%" }}>
                                <Slider
                                    value={value}
                                    onValueChange={setValue}
                                    maximumValue={20000}
                                    minimumValue={500}
                                    step={500}
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
                                <Text style={{ textAlign: 'right', marginTop: 10 }}>Rechercher {valueRad} km autour de moi</Text>
                            </View>
                            <View style={{ width: '95%' }}>
                                <DropDownPicker
                                    open={open}
                                    value={categorie}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setCategorie}
                                    setItems={setItems}
                                    style= {{ marginTop: 20,
                                        borderRadius: 20,
                                        borderColor: '#86939e'
                                     }}
                                    dropDownContainerStyle={{
                                        backgroundColor: 'white',
                                        marginTop: 20,
                                        borderRadius: 20,
                                        borderColor: '#86939e'
                                    }}
                                />
                            </View>
                            <ScrollView style={{ width: '100%', height : 390, marginTop: 10, zIndex: -1, position: 'relative' }} showsVerticalScrollIndicator={false} >
                                {listingSwipe}
                            </ScrollView >
                            <Text style={{ fontSize: 17, marginBottom: 10, color: '#7241DB', marginTop: 10 }} onPress={() => { setCategorie(""), setValue(1500) }} >Reinitialiser les filtres</Text>
                        </View>
                    )}
                    disablePressToShow={true}
                    disableSwipeIcon={true}
                    extraMarginTop={Dimensions.get('window').height - Dimensions.get('window').height / 1.09}
                    swipeHeight={170}
                    animation="spring"
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
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

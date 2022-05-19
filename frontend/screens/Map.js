import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

// Import de la Map
import MapView, { Marker } from 'react-native-maps';

function Map(props) {

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
            >
                <Marker pinColor="#7241DB"
                    coordinate={{ latitude: props.locaTion.latitude, longitude: props.locaTion.longitude }}
                    title="Vous êtes ici"
                    description="Trouvez un prestataire autour de vous"
                />
                {props.preStataires.map((element, i) => {
                    return (
                        <Marker key={i}
                            pinColor="#3DA787"
                            coordinate={{ latitude: element.lat, longitude: element.lon }}
                            title={element.name}
                            description="Reservez dès maintenant"
                        />
                    )
                })}
            </MapView>

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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

function mapStateToProps(state) {
    return { preStataires: state.prestataires, locaTion : state.location }
}

export default connect(
    mapStateToProps,
    null
)(Map);

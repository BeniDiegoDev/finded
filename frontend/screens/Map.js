import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import components
import Listing from '../components/Listing'

// Import de la connexion avec Redux
import { connect } from 'react-redux'

function Map(props) {

    console.log(props.preStataires)

    return (
        <View style={styles.container}>

            <View style={{ paddingLeft: 10, paddingBottom: 10, paddingTop: 10 }}>
                <Text style={{ paddingRight: 15, fontSize: 30 }}><Ionicons onPress={() => { props.navigation.goBack() }} name='chevron-back' size={30} color='black' /> Autour de moi</Text>
            </View>

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
});

function mapStateToProps(state) {
    return { preStataires: state.prestataires, }
}

export default connect(
    mapStateToProps,
    null
)(Map);

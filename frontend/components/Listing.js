import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback } from 'react-native';

// Import de la barre de recherche
import { SearchBar, Card } from '@rneui/themed';
import { Button } from '@rneui/base'

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import module de geolocalisation via Expo
import * as Location from 'expo-location';

// Import de la connexion avec Redux
import { connect } from 'react-redux'

export default function Listing(props) {
    return (
                    <Card
                        containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row' }} >
                            <Image
                                style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: 120, width: 120 }}
                                source={{ uri: props.images }}
                            />
                            <View style={{ marginLeft: 15, justifyContent: 'center', minWidth: '60%' }}>
                                <Text style={{fontSize: 17}}>{props.name}</Text>
                                <Text >{props.number} {props.address}</Text>
                                <Text >{props.zipcode} {props.city}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>{props.note} <Ionicons name="md-star" size={17} color="#F5B642" /></Text>
                                </View>
                            </View>
                        </View>
                    </Card>
    )
}




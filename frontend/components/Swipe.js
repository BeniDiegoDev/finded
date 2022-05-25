import React, {useState} from 'react';

import { View, Text, Dimensions } from 'react-native';

// Import de la barre de recherche
import { Slider } from '@rneui/themed';

// Import des icones
import { Ionicons } from '@expo/vector-icons';

// Import du Swipe Up & Down
import SwipeUpDown from 'react-native-swipe-up-down';

// Import des picker
import { Picker } from "@react-native-picker/picker";

export default function Swipe(props) {

    const [value, setValue] = useState(1500)
    const [categorie, setCategorie] = useState("")

    return (
        <SwipeUpDown 
            itemMini={() => (
                <View style={{ alignItems: 'center' }}>
                    <Text>
                        Filtrer ma recherche
                    </Text>
                </View>
            )}
            itemFull={() => (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ fontSize: 17 }}>Filtrer autour de vous :</Text>
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
                        <Text style={{ textAlign: 'right', marginTop: 10 }}>Rechercher {props.valueRad} km autour de moi</Text>
                    </View>
                    <View style={{ width: '95%' }}>
                        <Picker
                            selectedValue={categorie}
                            onValueChange={(value) => setCategorie(value)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Catégorie" value="" />
                            <Picker.Item label="Mécanique" value="Mécanique" />
                            <Picker.Item label="Coiffeur" value="Coiffeur" />
                            <Picker.Item label="Pédicure" value="Pédicure" />
                            <Picker.Item label="Massage" value="Massage" />
                            <Picker.Item label="Baby-Sitting" value="Baby-Sitting" />
                            <Picker.Item label="Peinture" value="Peinture" />
                            <Picker.Item label="Estheticienne" value="Estheticienne" />
                            <Picker.Item label="Serrurier" value="Serrurier" />
                        </Picker>
                    </View>
                    <Text style={{ fontSize: 17, marginBottom: 10, color: '#7241DB' }} onPress={() => { props.setCategorie(""), props.setValue(1500) }} >Reinitialiser les filtres</Text>
                </View>
            )}
            onShowMini={() => console.log('mini')}
            onShowFull={() => console.log('full')}
            onMoveDown={() => console.log('down')}
            onMoveUp={() => console.log('up')}
            disablePressToShow={true}
            style={{ backgroundColor: 'white' }}
            extraMarginTop={Dimensions.get('window').height - Dimensions.get('window').height / 1.09}
            swipeHeight={160}
            minHeight={10}
            animation="spring"
        />
    )
}
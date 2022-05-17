
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements'

export default function App() {

 const [text, setText] = useState('');

 
 return (
   <View>
     <Input

       onChangeText={(value) => setText(value)}

       value={text}

     />
     <Button title ="valider"
       onPress={()=>console.log(text)}
     />
   </View>
 );
 
}
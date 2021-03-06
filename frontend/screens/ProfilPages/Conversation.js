import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { Pressable, StyleSheet, Text, View } from 'react-native';

// mise en place du webSocket
import socketIOClient from "socket.io-client";
var socket = socketIOClient("https://findedbackend.herokuapp.com");

import { Ionicons } from '@expo/vector-icons';


export default function Conversation(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Bonjour',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Florus Melanson',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    socket.emit('sendMessage', { messages: messages })
  }, [])


  let renderBubble = (props) => {
    return (
      <Bubble {...props} textStyle={{
        right: {
          color: 'white',
        },
        left: {
          color: 'white',
        }
      }}
        wrapperStyle={{
          right: {
            backgroundColor: '#3DA787',
          },
          left: {
            backgroundColor: '#7241DB',
          }
        }}
      />
    )
  }







  // si le device est un android

  if (Platform.OS === 'android') {
    return (
      <>
        <Pressable onPress={() => { props.navigation.goBack(null) }}>
          <Text style={styles.title_messages}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null) }} /> Nom prestataire</Text>
        </Pressable>
        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={messages => onSend(messages)}
          placeholder="Votre message..."
          user={{
            _id: 1,
          }}
        />
      </>
    )

    // si le device est un ios

  } else if (Platform.OS === 'ios') {

    return (
      <>
        <Pressable onPress={() => { props.navigation.goBack(null) }}>
          <Text style={styles.title_messages}><Ionicons name="chevron-back" size={30} color="black" onPress={() => { props.navigation.goBack(null) }} /> Nom prestataire</Text>
        </Pressable>
        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={messages => onSend(messages)}
          placeholder="Votre message..."
          bottomOffset={80}
          user={{
            _id: 1,
          }}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  title_messages: {
    paddingTop: 50,
    backgroundColor: '#fff',
    paddingBottom: 30,
    paddingHorizontal: 10,
    fontSize: 30,
  },
});


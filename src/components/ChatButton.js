import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

class ChatButton extends Component{
    render() {
    return (
        <TouchableOpacity
            style={{
                width: 40,
                height:30,
                marginRight: 5
            }}
            onPress={()=>{
                this.props.navigation.push('Chat')
            }}
        >
            <MaterialIcons name='chat-bubble' size={30} color='yellow'/>
        </TouchableOpacity>
    )
    };
}

export default withNavigation(ChatButton);
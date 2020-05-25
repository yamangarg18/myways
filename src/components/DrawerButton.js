import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

class DrawerButton extends Component{
    render() {
    return (
        <TouchableOpacity
            style={{
                width: 40,
                height: 38,
                marginLeft: 10
            }}
            onPress={()=>{
                this.props.navigation.openDrawer();
            }}>
            <Ionicons name='md-menu' size={40} color='yellow'/>
        </TouchableOpacity>
    )
    };
}

export default withNavigation(DrawerButton);
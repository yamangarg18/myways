import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import BackButton from '../components/BackButton';

class SupportScreen extends React.Component {
   
    static navigationOptions = {
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/favicon.png')}
            />
            <Text style={styles.text}>Support</Text>
        </View>
      );
    }
}

const SupportStack = createStackNavigator({
   Support:SupportScreen
},{
    defaultNavigationOptions: {
      title: 'Support',
      headerLeft: () => <BackButton/>,
      headerStyle: {
        backgroundColor: 'darkslategrey'
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "yellow",
      },
      headerTitleAlign: 'center'
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    logo: {
        alignSelf: 'center',
        width: 125,
        height: 120,
        marginBottom: 5,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 30,
    },
});

export default SupportStack;
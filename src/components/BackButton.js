import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

class BackButton extends Component {
 render() {
   return (
      <TouchableOpacity
       style={styles.backButton}
       onPress={() => {
         this.props.navigation.pop();
       }}
      >
      <Ionicons
         name= 'ios-arrow-back'
         size={20}
         color= 'yellow'
      />
     </TouchableOpacity>
   );
 }
}
const styles = StyleSheet.create({
 backButton: {
   height: 44,
   width: 44,
   justifyContent: 'center',
   alignItems: 'center',
 },
});
export default withNavigation(BackButton);
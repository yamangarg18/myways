import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class StarRatingBar extends Component {
  state = {
    Default_Rating: 0,
    Max_Rating: 5,
  };
  star_corner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
  star_filled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }
  render() {
    let React_Native_Bar = [];
    for (i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Bar.push(
        <TouchableOpacity
          activeOpacity={0.5}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.star}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.star_filled }
                : { uri: this.star_corner }
            }
          ></Image>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyleSmall}>Rate </Text>
        <View style={styles.childView}>{React_Native_Bar}</View>
        <Text style={styles.textStyle}>{this.state.Default_Rating}</Text>
      </View>
    );
  }
}
// const Star = () => {
//   return (
//     <View>
//       <View style={styles.row}>
//         <FontAwesome name='star' style={styles.star} />
//         <FontAwesome name='star' style={styles.star} />
//         <FontAwesome name='star' style={styles.star} />
//         <FontAwesome name='star' style={styles.star} />
//         <FontAwesome name='star' style={styles.star} />
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  star: {
    height: 20,
    width: 20,
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 15,
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
  },
});

// export default Star;

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase';
import db from '../config';

export default class StoryCard extends Component {
   constructor(props) {
    super(props);
    this.state = {
      lightTheme: true,
    };
  }
  fetchTheme = async () => {
    let theme;
    await db
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        this.setState({
          lightTheme: theme === 'light' ? true : false,
        });
      });
  };

  componentDidMount() {
    this.fetchTheme();
  }
  render() {
    return (
     <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('StoryScreen', {
            story: this.props.story,
          })
        }>
        <View style={this.state.lightTheme == true
            ? styles.storyContainerLight : styles.storyContainer}>
          <Image
            source={require("../images/story_image_1.png")}
            style={styles.storyImage}
          />
          <View style={styles.titleContainer}>
            <Text style={this.state.lightTheme == true
            ? styles.titleTextLight : styles.titleText}>{this.props.story.title}</Text>
            <Text style={this.state.lightTheme == true
            ? styles.authorTextLight : styles.authorText}>{this.props.story.author}</Text>
            <Text style={this.state.lightTheme == true
            ? styles.descriptionLight : styles.description}>
              {this.props.story.description}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likebutton}>
              <Ionicons name="heart" color={this.state.lightTheme==true? "black": "white"} size={RFValue(30)} />
              <Text style={this.state.lightTheme == true
            ? styles.likeTextLight : styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  storyContainer: {
    backgroundColor: '#2f345d',
    padding: 10,
    height: undefined,
    borderRadius: 20,
    marginTop: -20,
    marginBottom: 20,
    marginVertical: 20,
  },
  storyContainerLight : {
    backgroundColor: 'white',
    padding: 10,
    height: undefined,
    borderRadius: 20,
    marginTop: -20,
    marginBottom: 20,
    marginVertical: 20,
  },
  storyImage: {
    width: '95%',
    height: RFValue(250),
    borderRadius: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  titleTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  authorText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'white',
  },
  authorTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(18),
    color: 'black',
  },
  description: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(10),
    color: 'white',
  },
   descriptionLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(10),
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likebutton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
    width: RFValue(160),
    height: RFValue(40),
  },
  likeText: {
    color: 'white',
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginTop : 6
  },
  likeTextLight: {
    marginLeft: RFValue(5),
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginTop : 6,
    color : 'black'
  },
});

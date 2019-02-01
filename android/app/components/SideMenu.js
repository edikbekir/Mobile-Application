import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, AsyncStorage, TouchableHighlight} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { strings } from '../lib/i18n.js';
import I18n from 'react-native-i18n';
import Flag from 'react-native-flags';

const EMAIL = 'user_email'

class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      stateOfLocale: "en"
    }
    this.userEmail();
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  userEmail = async () => {
    const userEmail = await AsyncStorage.getItem(EMAIL);
    this.setState({
      email: userEmail
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Text style={styles.info}>
            <Text style={styles.profileEmail}>
            {this.state.email}
            </Text>
          </Text>
        </View>
        <ScrollView>
            <View style={styles.navSectionStyle}>
              <Icon
              name='clock-o'
              size={40}
              color='#293444'/>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Main')}>
              {strings('SideMenu.availableEvents')}
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Icon
              name='check-circle'
              size={40}
              color='#293444'/>
              <Text style={styles.navItemStyle} onPress={() => this.props.navigation.navigate('AddEvent')}>
                {strings('SideMenu.subscribeToEvents')}
              </Text>
            </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.setLanguages}>
            <TouchableHighlight style={styles.language}>
              <Flag
              code="GB"
              size={32}
              />
            </TouchableHighlight>
            <TouchableHighlight style={styles.language}>
              <Flag
              code="UA"
              size={32}
              />
            </TouchableHighlight>
          </View>
          <Text>GO TO EVENT</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#0a55ce",
  },
  setLanguages:{
    flexDirection: "row"
  },
  language:{
    marginRight: "5%"
  },
  profileEmail: {
    width: "100%",
    fontSize: 18
  },
  info: {
    backgroundColor: "#919191",
    padding: 50,
    fontSize: 20,
    borderBottomWidth: 5,
  },
  navItemStyle: {
    fontSize: 20,
    padding: 10
  },
  navSectionStyle: {
    marginLeft: 5,
    backgroundColor: 'lightgrey',
    flexDirection: 'row'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
})

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

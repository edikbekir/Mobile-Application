import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';
import { createStackNavigator } from "react-navigation";
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./Main";
import AddEventScreen from "./AddEvent";

const stackNav = createStackNavigator({
  Main : {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Main"
    })
  },
  AddEvent : {
    screen: AddEventScreen,
    navigationOptions: ({navigation}) => ({
      title: "Subscribe to events"
    })
  },

});

export default stackNav;

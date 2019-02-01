import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Alert, Text, View, PermissionsAndroid, Button, Dimensions} from 'react-native';
import { createAppContainer, createDrawerNavigator, createSwitchNavigator} from "react-navigation";
import Login from './android/app/components/Login.js';
import Loading from './android/app/components/Loading.js';
import SignUp from './android/app/components/SignUp.js';
import Main from './android/app/components/Main.js';
import AddEvent from './android/app/components/AddEvent.js';
import SideMenu from './android/app/components/SideMenu.js';
import stackNav from './android/app/components/stacknav.js';
import AuthLoadingScreen from './android/app/components/AuthLoadingScreen.js';

class App extends React.Component {
}

const drawernav = createDrawerNavigator({
  stackNav: { screen: stackNav }
},
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
  }
);

import { createStackNavigator } from 'react-navigation';

const AppStack = createStackNavigator({ Main: Main, AddEvent: AddEvent });
const AuthStack = createStackNavigator({ SignUp: SignUp, Login: Login });

export default createAppContainer(createSwitchNavigator(
  { drawer: drawernav,
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

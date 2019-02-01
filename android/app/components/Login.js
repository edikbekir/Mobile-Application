import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Common } from '../lib/Common.js';

import {
  Component,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const ACCESS_TOKEN = 'access_token';
const USER_EMAIL = 'user_email';

class Login extends React.Component {
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }

  storeToken(responseData){
    let response = JSON.parse(responseData)
    AsyncStorage.setItem(ACCESS_TOKEN, response.access_token, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
    AsyncStorage.setItem(USER_EMAIL, response.email, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }
  async onLoginPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch(Common.BACKEND_PORT + '/api/v1/login', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          let responseData = res;
          this.storeToken(responseData);
          this.props.navigation.navigate('Main');
      } else {
        Alert.alert("error")
      }
    } catch(error) {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Log In
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <Text style={styles.error}>
          {this.state.error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    borderRadius: 8,
    height: 50,
    width: "100%",
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#293444'
  },
  button: {
    borderRadius: 8,
    height: 50,
    backgroundColor: '#293444',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login

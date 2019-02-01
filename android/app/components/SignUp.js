import React from 'react';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Common } from '../lib/Common.js';
import { Component, StyleSheet, TextInput, TouchableHighlight, AsyncStorage, Picker, Alert, Text, View } from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      first_name: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false,
    }
  }

  async storeToken(accessToken) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfull ");
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  async onRegisterPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch(Common.BACKEND_PORT + '/api/v1/visitors', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  first_name: this.state.name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          let accessToken = res;
          this.storeToken(accessToken);
          this.props.navigation.navigate('Main')
      } else {
          let error = res;
      }
    } catch(errors) {
      let formErrors = JSON.parse(errors);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Join us now!
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={ () => this.props.navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>
            Already have an account? Log in
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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
    width: "100%",
    height: 50,
    marginTop: 10,
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#293444'
  },
  button: {
    borderRadius: 8,
    height: 50,
    backgroundColor: '#293444',
    alignSelf: 'stretch',
    marginTop: 20,
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
  loader: {
    marginTop: 20
  }
});

export default Register;

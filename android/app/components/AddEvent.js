import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ScrollView
} from 'react-native';
import { Common } from '../lib/Common.js';
import { strings } from '../lib/i18n.js';


export default class AddEvent extends React.Component {

  constructor(){
    super();
    this.state = {
      events: {}
    }
  }

  componentDidMount(){
    return fetch(Common.BACKEND_PORT + '/api/v1/index', {
      method: "GET"
    })
    .then(result => result.json())
    .then((responseJson) => {
      this.setState({
        events: responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render(){
    return(
      <ScrollView>
        <View>
        {
          Object.keys(this.state.events).map(item=>{
            return (
              <View style={styles.visitEvent}>
                <Text style={styles.nameEvent}>{"some"}</Text>
                <Text style={styles.eventDate}>{"some date"}</Text>
                <View style={styles.goButton}>
                  <Button  color="#3fb218"title="sss" />
                </View>
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  row: {
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'column',
    width: "100%"
  },
  leftComponent: {
    flex: 0.7,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  rightComponent: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
  },
  eventDate: {
    borderRadius: 10,
    color: "#000",
    backgroundColor: "#2cb7a4",
    padding: 4,
    fontSize: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  nameEvent:{
    marginLeft: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  visitEvent: {
    justifyContent: "space-between",
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: "nowrap"
  },
  goButton: {
    marginRight: 10,
    marginTop: 10
  }
})

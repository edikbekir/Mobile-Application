import React from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Button,
  ScrollView,
  AsyncStorage
} from 'react-native';
import wifi from 'react-native-android-wifi';
import DeviceInfo from 'react-native-device-info';
import { Common } from '../lib/Common.js';
import { strings } from '../lib/i18n.js';

const USER_EMAIL = 'user_email'

export default class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      email: "",
      macAddress: null,
      bssid: null,
      events: {},
      marks: []
    }
    this.getEvents();
  }

  setBssid(){
    wifi.getBSSID(bssid =>{
      this.setState({
        bssid: bssid
      })
    })
  }

  setEvents(responseData){
    let events = JSON.parse(responseData)
    Alert.alert(JSON.stringify(responseData))
    this.setState({
      events: events
    })
  }

  async getEvents(){
    try {
      await AsyncStorage.getItem('user_email').then(res => this.setState({email: res}))
      let response = await fetch(Common.BACKEND_PORT + '/api/v1/get_events', {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({email_visitor: await this.state.email})
                    });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          this.setEvents(res)
          this.setBssid();
      } else {
        Alert.alert("error")
      }
    } catch (e) {

    }
  }

  formatDate(date) {
    date = String(date).split(' ');
    var days = String(date[0]).split('T');
    return days[0] + " " + days[1].split(".")[0]
  }

  visitEvent(item){
    return fetch(Common.BACKEND_PORT + '/api/v1/update_event', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        visitor: { email: this.state.email},
        event: { id: item.id },
        visitor_bssid: this.state.bssid
      })
    })
    .then(result => result.json())
    .then(responseJson => {
      if(responseJson.success == true){
        this.setState({
          marks: this.state.marks.push(item.id)
        })
        Alert.alert("You are marked")
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  disableGoButton(id){
    if(this.state.marks.includes(id) == true){
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <ScrollView>
      {this.state.events.length > 0 ?
        <Text style={styles.centerText}>{strings('main.availableEvents')}</Text>
         :
         <Text style={styles.centerText} >{strings('main.emptyEvents')}</Text>
       }

        <View style={styles.row}>
            {
              Object.keys(this.state.events).map(item => {
                return (
                  <View style={styles.visitEvent}>
                    <Text style={styles.nameEvent}>{this.state.events[item].name}</Text>
                    <Text style={styles.eventDate}>{this.formatDate(this.state.events[item].start_time)}</Text>
                    <View style={styles.goButton}>
                      <Button color="#3fb218" title={strings('main.startEvent')} onPress={ () => {this.visitEvent(this.state.events[item])} } />
                    </View>
                  </View>
                )
              })
            }
        </View>
      </ScrollView>
    );
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
    width: "15%",
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

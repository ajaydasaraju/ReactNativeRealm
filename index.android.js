/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';
const PatientSchema = {
  name: 'Patients',
 
  properties: {
   // primary key
    name: 'string',
    bp: 'string' ,
	  weight: 'string',
    temperature: 'string',
  }
};
const Realm = require('realm');
 let realm = new Realm({
     schema: [PatientSchema]
   });
export default class Test extends Component {
  constructor(props) {
    super(props);
 this.state = {
      name: '',
      bp: '',
      weight: '',
      temperature: ''
    }
  }
  retrieve= () =>{
     var result = realm.objects('Patients');
      for (var i = 0; i < result.length; i++) {
      this.setState({ name: result[i].name, bp: result[i].bp, weight: result[i].weight, temperature: result[i].temperature });
      }
    
  };

 submit = () => {
   realm.write(() => {
   realm.create('Patients', {name:this.state.name ,bp: this.state.bp ,weight: this.state.weight,temperature: this.state.temperature});
  }); 
 };
  

 render() {
  //  realm.write(() => {
  //    realm.create('Patients', {name: 'vijay',bp: '+ve' ,weight: '68',temperature: '45'});
  //  });

   return (
     <View style={styles.container}>
       <Text style={styles.welcome}>
          Patient Details
        </Text>
         <View style={{ flexDirection: 'row' }}>
          <Text>Name: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
             value={this.state.name}
             onChangeText={(name) => this.setState({ name })}
          />
          </View>
           <View style={{ flexDirection: 'row' }}>
          <Text>BP: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            placeholder='Enter Blood Pressure'
             value={this.state.bp}
             onChangeText={(bp) => this.setState({ bp })}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Weight: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            placeholder='Enter Weight'
             value={this.state.weight}
             onChangeText={(weight) => this.setState({ weight })}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text>Temperature: </Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
            placeholder='Enter Temperature'
             value={this.state.temperature}
             onChangeText={(temperature) => this.setState({ temperature })}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
          onPress={() => this.submit()}
            title="Submit !"
            color="blue"
            accessibilityLabel="Save data to database">
            Submit !
        </Button>
         <Button
          onPress={() => this.retrieve()}
            title="Retrieve !"
            color="green"
            accessibilityLabel="Retrieve data from database">
            Submit !
        </Button>
        </View>
        <View>
          <Text>Name: {this.state.name} BP: {this.state.bp} Temp:{this.state.temperature} Weight:{this.state.weight}</Text>
        </View>

       <Text style={styles.welcome}>
         Name of Patients  in Realm: {realm.objects('Patients').length}
       </Text>
     </View>
   );
 }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccccff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Test', () => Test);

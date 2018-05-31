/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import {TouchableWithHapticFeedback, HapticFeedback} from 'react-native-haptic-feedback';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableWithHapticFeedback>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Fizz</Text>
          </View>
        </TouchableWithHapticFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  button: {
    height: 50,
    flex: 0,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  buttonText: {

  }
});

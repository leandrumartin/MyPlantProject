import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Sensor from '../../shared/Sensor';

import ReduxTest from './src/components/ReduxTest';
import Database from './src/components/Database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          <Sensor initial={0} label={'degrees'} dataType={'temperature'} />
          <Sensor initial={0} label={'Pa'} dataType={'pressure'} />
          <Sensor initial={0} label={'%'} dataType={'humidity'} />
          <ReduxTest />
          <Database />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

import React from 'react';

import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import Sensor from '../../shared/Sensor';

import ReduxTest from './src/components/ReduxTest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Sensor initial={20} label={'degrees'} dataType={'temperature'} />
        <Sensor initial={50} label={'Pa'} dataType={'pressure'} />
        <Sensor initial={75} label={'%'} dataType={'humidity'} />
        {/* <WaterSensor initial={50} /> */}
        <Sensor initial={0} label={''} />
        <ReduxTest />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

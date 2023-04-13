import React from 'react';

import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import WaterSensor from './src/components/WaterSensor';
import Sensor from '../../shared/Sensor';

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
        
        <Sensor initial={10} label={'degrees'} />
        <Sensor initial={5} label={'Pa'} />
        <Sensor initial={0} label={'%'} />
        <WaterSensor />
  
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

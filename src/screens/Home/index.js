import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TemperatureSensor from './src/components/TemperatureSensor';
import WaterSensor from './src/components/WaterSensor';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
     <TemperatureSensor />
    <WaterSensor />
    <Text></Text>
      <Button
        title="Go to Landing"
        onPress={() => navigation.navigate('Landing')}
      />
    </View>
    
  );
};

export default HomeScreen;
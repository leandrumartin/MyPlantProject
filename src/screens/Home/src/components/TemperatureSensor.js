import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default function TemperatureSensor(props) {
  const [temperature, setTemperature] = useState(0);
  const [sensorStyle, setSensorStyle] = useState();

  useEffect(() => {
    // Update indicator styling based on temperature
    if (temperature < 5) {
      setSensorStyle(styles.sensorCold);
    } else {
      setSensorStyle(styles.sensorHot);
    }
  }, [temperature]);

  return (
    <View style={styles.container}>
      {/* Temperature up button */}
      <TouchableHighlight
        style={styles.tempChangeButton}
        onPress={() => {
          setTemperature(temperature + 1);
        }}
      >
        <Text style={styles.tempChangeText}>+</Text>
      </TouchableHighlight>

      {/* Temperature indicator */}
      <View style={{ ...styles.sensor, ...sensorStyle }}>
        <Text style={styles.temperatureText}>{temperature}</Text>
      </View>

      {/* Temperature down button */}
      <TouchableHighlight
        style={styles.tempChangeButton}
        onPress={() => {
          setTemperature(temperature - 1);
        }}
      >
        <Text style={styles.tempChangeText}>-</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tempChangeButton: {
    backgroundColor: '#ccc',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  tempChangeText: {
    fontSize: 30,
  },
  sensor: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensorCold: {
    backgroundColor: 'blue',
  },
  sensorHot: {
    backgroundColor: 'red',
  },
  temperatureText: {
    fontSize: 30,
    color: '#fff',
  },
});

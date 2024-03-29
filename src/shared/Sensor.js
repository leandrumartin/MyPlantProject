import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { sensorReducer } from '../redux/reducers';

export default function Sensor({ initial, label, dataType }) {
  const [sensorValue, setSensorValue] = useState(Number(initial));
  const [indicatorStyle, setIndicatorStyle] = useState();

  const value = useSelector((state) => state.sensors.sensorValue); // Get the sensor value from the MQTT sensor in the Redux state

  setTimeout(() => {
    // Convert JSON string to JSON object
    let sensorData = value;
    if (typeof sensorData === 'string') {
      sensorData = JSON.parse(sensorData);
    }

    for (const [key, val] of Object.entries(sensorData)) {
      if (key === dataType) {
        setSensorValue(Number(val));
      }
    }
  }, 2000);

  useEffect(() => {
    // Update indicator styling based on sensor value
    if (sensorValue < 25) {
      setIndicatorStyle(styles.indicatorLow);
    } else if (sensorValue < 50) {
      setIndicatorStyle(styles.indicatorMidLow);
    } else if (sensorValue < 75) {
      setIndicatorStyle(styles.indicatorMidHigh);
    } else {
      setIndicatorStyle(styles.indicatorHigh);
    }
  }, [sensorValue]);

  return (
    <View style={styles.container}>
      {/* Value up button */}
      {/* <TouchableHighlight
        style={styles.valueChangeButton}
        onPress={() => {
          setSensorValue(sensorValue + 1);
        }}
      >
        <Text style={styles.valueChangeText}>+</Text>
      </TouchableHighlight> */}

      {/* Value indicator */}
      <View style={{ ...styles.indicator, ...indicatorStyle }}>
        <Text
          style={styles.valueText}
          adjustsFontSizeToFit={true}
          numberOfLines={2}
        >
          <Text>
            {sensorValue} {label}
          </Text>
          {/* <Text>{'\n'}</Text> */}
          {/* <Text>{label}</Text> */}
        </Text>
      </View>

      {/* Value down button */}
      {/* <TouchableHighlight
        style={styles.valueChangeButton}
        onPress={() => {
          setSensorValue(sensorValue - 1);
        }}
      >
        <Text style={styles.valueChangeText}>-</Text>
      </TouchableHighlight> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  indicator: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorLow: {
    backgroundColor: 'blue',
  },
  indicatorHigh: {
    backgroundColor: 'red',
  },
  indicatorMidLow: {
    backgroundColor: 'lightblue',
  },
  indicatorMidHigh: {
    backgroundColor: 'pink',
  },
  valueChangeButton: {
    backgroundColor: '#ccc',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  valueChangeText: {
    fontSize: 30,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
});

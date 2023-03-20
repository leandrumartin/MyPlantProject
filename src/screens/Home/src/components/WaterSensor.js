import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function WaterSensor(props) {
  const [isWatered, setWatered] = useState(false);

  // Flip isWatered variable used for styling water indicator
  const handleWater = () => {
    setWatered(!isWatered);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleWater}>
        <View
          style={{
            ...styles.sensor,
            ...(isWatered ? styles.sensorWatered : styles.sensorUnwatered),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sensor: {
    width: 100,
    height: 100,
  },
  sensorUnwatered: {
    backgroundColor: 'green',
  },
  sensorWatered: {
    backgroundColor: 'blue',
  },
});

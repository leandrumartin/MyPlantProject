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
          style={isWatered ? styles.sensorWatered : styles.sensorUnwatered}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sensorUnwatered: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
  },
  sensorWatered: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
  },
});

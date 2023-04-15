import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function WaterSensor({ initial }) {
  const [sensorValue, setSensorValue] = useState(Number(initial));
  const [indicatorStyle, setIndicatorStyle] = useState();

  useEffect(() => {
    // Update indicator styling based on sensor value
    if (sensorValue < 30) {
      setIndicatorStyle(styles.indicatorLow);
    } else {
      setIndicatorStyle(styles.indicatorHigh);
    }
  }, [sensorValue]);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleWater}> */}
      <View
        style={{
          ...styles.indicator,
          ...indicatorStyle,
        }}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    width: 100,
    height: 100,
  },
  indicatorLow: {
    backgroundColor: 'green',
  },
  indicatorHigh: {
    backgroundColor: 'blue',
  },
});

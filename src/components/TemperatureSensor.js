import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default function TemperatureSensor(props) {
  const [temperature, setTemperature] = useState(0);
  const [sensorStyle, setSensorStyle] = useState();

  useEffect(() => {
    if (temperature < 5) {
      setSensorStyle(styles.sensorCold);
    } else {
      setSensorStyle(styles.sensorHot);
    }
  }, [temperature]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.tempChangeButton}
        onPress={() => {
          setTemperature(temperature + 1);
        }}
      >
        <Text style={styles.tempChangeText}>+</Text>
      </TouchableHighlight>

      <View style={sensorStyle}>
        <Text style={styles.temperature}>{temperature}</Text>
      </View>

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
    alignItems: "center",
  },
  tempChangeButton: {
    backgroundColor: "#ccc",
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  tempChangeText: {
    fontSize: 30,
  },
  sensorCold: {
    backgroundColor: "blue",
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sensorHot: {
    backgroundColor: "red",
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  temperature: {
    fontSize: 30,
    color: "#fff",
  },
});

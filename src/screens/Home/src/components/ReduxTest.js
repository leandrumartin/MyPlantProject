import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_SENSOR_DATA } from '../../../../redux/actions';

// import { sensorReducer } from '../redux/reducers';

export default function ReduxTest() {
  const dispatch = useDispatch();

  const handlePress = () => {
    let tempVal = parseInt(Math.random() * 100);
    let presVal = parseInt(Math.random() * 100);
    let humVal = parseInt(Math.random() * 100);

    dispatch({
      type: ADD_SENSOR_DATA,
      payload: {
        temperature: tempVal,
        pressure: presVal,
        humidity: humVal,
      },
    });
  };

  return (
    <TouchableHighlight style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>Press me!</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

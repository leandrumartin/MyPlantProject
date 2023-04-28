import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_SENSOR_DATA } from '../../../../redux/actions';

// import { sensorReducer } from '../redux/reducers';

export default function ReduxTest() {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch({
      type: ADD_SENSOR_DATA,
      payload: '{ "temperature": 500, "humidity": 70 }',
    });
  };

  return (
    <TouchableHighlight style={styles.container} onPress={handlePress}>
      <Text>Hello</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
});

export const ADD_SENSOR_DATA = 'ADD_SENSOR_DATA';

export const addSensorData = (value) => {
  return {
    type: ADD_SENSOR_DATA,
    payload: value,
  };
};

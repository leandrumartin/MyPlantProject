import { ADD_SENSOR_DATA } from './actions';

const initialState = {
  sensorValue: {
    humidity: '0',
    temperature: '0',
    pressure: '0',
  },
};

const sensorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SENSOR_DATA:
      console.log('sensorReducer is sending ' + action.payload);
      return {
        sensorValue: action.payload,
      };
    default:
      return state;
  }
};

export default sensorReducer;

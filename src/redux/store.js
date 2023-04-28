import { configureStore } from '@reduxjs/toolkit';
import sensorReducer from './reducers';

export default configureStore({
  reducer: {
    sensors: sensorReducer,
  },
});

import React from 'react';
import { useDispatch } from 'react-redux';

export default function MqttToRedux(Mqtt) {
  return function WrappedComponent() {
    const dispatch = useDispatch();
    return <Mqtt useDispatch={dispatch} />;
  };
}

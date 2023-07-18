import React from 'react';
import { useSelector } from 'react-redux';

export default function WrapSelector(Component, SelectorFn) {
  return function WrappedComponent() {
    const selected = useSelector(SelectorFn);
    return <Component useSelector={selected} />;
  };
}

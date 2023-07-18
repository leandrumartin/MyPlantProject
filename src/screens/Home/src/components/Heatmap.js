import React, { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import Database from './Database';
import { useSelector } from 'react-redux';
import Svg, { Rect } from 'react-native-svg';
import * as d3 from 'd3';
import * as SQLite from 'expo-sqlite';

export default function Heatmap({ width, height, data }) {
  if (data === null) return;

  // Get sensor data from Redux
  const [sensorValue, setSensorValue] = useState(0);
  dingus = useSelector((state) => state.sensors.sensorValue);
  setTimeout(() => {
    setSensorValue(dingus);
  }, 1000);
  data[0] = { ...data[0], sensorVals: sensorValue };

  // List of unique items that will appear on the heatmap Y axis
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => d.Name))],
    [data]
  );
  const allXGroups = ['Temperature'];

  const xScale = useMemo(() => {
    return d3.scaleBand().range([0, 100]).domain(allXGroups).padding(0.01);
  }, [data, width]);
  const yScale = useMemo(() => {
    return d3.scaleBand().range([0, 100]).domain(allYGroups).padding(0.01);
  }, [data, width]);

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([0, 100]);

  const allRects = data.map((d, i) => {
    if (d.sensorVals === null) {
      return;
    }
    return (
      <Rect
        key={i}
        x={xScale}
        y={yScale}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.sensorVals.temperature)}
      />
    );
  });

  return (
    <View>
      <Svg width={width} height={height}>
        {allRects}
      </Svg>
    </View>
  );
}

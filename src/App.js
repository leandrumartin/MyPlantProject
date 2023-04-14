import React, { Component }from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Logs } from 'expo';
import LandingScreen from './screens/Landing';
import HomeScreen from './screens/Home';
import App_2 from './screens/Home/src/components/mqttfile';






const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Sensors" component={HomeScreen} />
        <Tab.Screen name="Mqtt" component={App_2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
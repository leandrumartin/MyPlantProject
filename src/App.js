import React, { Component }from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Logs } from 'expo';
import LandingScreen from './screens/Landing';
import HomeScreen from './screens/Home';
import App_2 from './screens/Home/src/components/mqttfile';
import store from './redux/store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Sensors" component={HomeScreen} />
          <Tab.Screen name="Mqtt" component={App_2} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
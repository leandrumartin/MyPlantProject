import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>apple</Text>

    </View>
  );
};

export default LandingScreen;

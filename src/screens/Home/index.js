import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
     
      <Button
        title="Go to landing"
        onPress={() => navigation.navigate('Landing')}
      />
    </View>
  );
};

export default HomeScreen;
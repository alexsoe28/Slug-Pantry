import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import RecipePage from './screens/RecipePage';

export default function App() {
  
  
  return (
    <View style={styles.screen}>
      <RecipePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

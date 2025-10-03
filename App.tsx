import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import AppFlowNavigator from './v1/apps/mobile/src/screens/AppFlowNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppFlowNavigator />
    </NavigationContainer>
  );
}

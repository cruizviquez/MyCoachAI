import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RoboQoachLogo({ size = 80 }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Simple vector logo using emoji for now, can be replaced with SVG or PNG */}
      <Text style={{ fontSize: size }}>
        🤖
      </Text>
      <Text style={{ fontSize: size / 3, fontWeight: 'bold', color: '#00D4FF' }}>
        RoboQoach
      </Text>
    </View>
  );
}

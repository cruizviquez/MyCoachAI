import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { theme } from '../assets/theme';

export default function GoalScreen() {
    return (
        <View style={styles.container}>
      <Text style={styles.text}>Select your fitness goal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.text,
    fontSize: 20,
  },
});

import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface BottomButtonContainerProps {
  children: React.ReactNode;
}

export default function BottomButtonContainer({ children }: BottomButtonContainerProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 30 : 50,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    // Ensure it's above other content
    zIndex: 100,
    elevation: 10,
  },
});
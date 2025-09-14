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
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 20 : 40,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    // Ensure it's above other content
    zIndex: 100,
    elevation: 10,
  },
});
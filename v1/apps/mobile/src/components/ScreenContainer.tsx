import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scrollable = false }) => {
  if (scrollable) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    );
  }
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

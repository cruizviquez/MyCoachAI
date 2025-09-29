// ============================================
// FILE 3: src/components/ScreenContainer.tsx
// THIS FIXES ALL SCROLLING/BUTTON ISSUES
// ============================================

import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { theme } from '../styles/theme';
import { responsive } from '../utils/responsive';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style = {},
}) => {
  const Container = scrollable ? ScrollView : View;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container
          style={[styles.container, style]}
          contentContainerStyle={scrollable ? styles.scrollContent : undefined}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
          {/* This ensures content doesn't hide behind buttons */}
          {scrollable && <View style={{ height: 100 }} />}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: responsive.scale(20),
    paddingBottom: responsive.vScale(100), // Extra space for fixed buttons
  },
});
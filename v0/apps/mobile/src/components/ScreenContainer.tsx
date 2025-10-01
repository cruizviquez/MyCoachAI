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
  Text,
} from 'react-native';
import { theme } from '../styles/theme';
import { responsive } from '../utils/responsive';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

import { RoboQoachLogo } from './RoboQoachLogo';

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style = {},
}) => {
  const Container = scrollable ? ScrollView : View;
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}> 
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <Container
          style={[styles.container, { backgroundColor: theme.colors.background }, style]}
          contentContainerStyle={scrollable ? styles.scrollContent : undefined}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoBar}>
            <RoboQoachLogo size={28} />
            <Text style={styles.logoText}>RoboQoach</Text>
          </View>
          {children}
          {scrollable && <View style={{ height: 120 }} />}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1.1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsive.scale(20),
    paddingBottom: responsive.vScale(120), // Extra space for fixed buttons
  },
});
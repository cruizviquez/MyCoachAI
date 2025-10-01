// ============================================
// FILE 4: src/components/Button.tsx
// PROFESSIONAL BUTTON COMPONENT
// ============================================

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../styles/theme';
import { responsive } from '../utils/responsive';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = true,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.base];
    
    // Size styles
    if (size === 'small') baseStyle.push(styles.small);
    if (size === 'medium') baseStyle.push(styles.medium);
    if (size === 'large') baseStyle.push(styles.large);
    
    // Variant styles
    if (variant === 'primary') baseStyle.push(styles.primary);
    if (variant === 'secondary') baseStyle.push(styles.secondary);
    if (variant === 'ghost') baseStyle.push(styles.ghost);
    if (variant === 'danger') baseStyle.push(styles.danger);
    
    // Width
    if (fullWidth) baseStyle.push(styles.fullWidth);
    
    // Disabled
    if (disabled) baseStyle.push(styles.disabled);
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const textStyle = [styles.text];
    
    if (size === 'small') textStyle.push(styles.textSmall);
    if (size === 'large') textStyle.push(styles.textLarge);
    
    if (variant === 'primary') textStyle.push(styles.textPrimary);
    if (variant === 'secondary') textStyle.push(styles.textSecondary);
    if (variant === 'ghost') textStyle.push(styles.textGhost);
    if (variant === 'danger') textStyle.push(styles.textDanger);
    
    return textStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#000' : theme.colors.primary} 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Sizes
  small: {
    paddingVertical: responsive.vScale(8),
    paddingHorizontal: responsive.scale(14),
  },
  medium: {
    paddingVertical: responsive.vScale(12),
    paddingHorizontal: responsive.scale(20),
  },
  large: {
    paddingVertical: responsive.vScale(14),
    paddingHorizontal: responsive.scale(24),
  },
  
  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontWeight: '700',
    fontSize: responsive.fontSize(16),
  },
  textSmall: {
    fontSize: responsive.fontSize(14),
  },
  textLarge: {
    fontSize: responsive.fontSize(18),
  },
  textPrimary: {
    color: '#000000',
  },
  textSecondary: {
    color: theme.colors.primary,
  },
  textGhost: {
    color: theme.colors.textSecondary,
  },
  textDanger: {
    color: '#FFFFFF',
  },
});
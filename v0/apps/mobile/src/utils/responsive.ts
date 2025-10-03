// ============================================
// 2. RESPONSIVE UTILITIES
// src/utils/responsive.ts
// ============================================

import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const responsive = {
  width: screenWidth,
  height: screenHeight,
  
  // Responsive scaling
  scale: (size: number) => {
    const baseWidth = 375; // iPhone 11 Pro
    return (screenWidth / baseWidth) * size;
  },
  
  // Vertical scaling
  vScale: (size: number) => {
    const baseHeight = 812; // iPhone 11 Pro
    return (screenHeight / baseHeight) * size;
  },
  
  // Font scaling
  fontSize: (size: number) => {
    const scale = screenWidth / 375;
    const newSize = size * scale;
    return Math.round(newSize);
  },
  
  // Platform specific
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
  
  // Safe areas
  safeAreaTop: Platform.OS === 'ios' ? 44 : 20,
  safeAreaBottom: Platform.OS === 'ios' ? 34 : 0,
};


// ============================================
// ROBOQOACH PROFESSIONAL DESIGN SYSTEM
// Complete responsive, modern UI without emojis
// ============================================

// 1. THEME & STYLES - Professional Design System
// src/styles/theme.ts
// ============================================

export const theme = {
  colors: {
    // Primary palette
    primary: '#00D4FF',      // Cyan
    primaryDark: '#0099CC',   
    primaryLight: '#66E5FF',
    
    // Neutral palette
    background: '#0A0A0A',    // Near black
    surface: '#1A1A1A',       // Dark gray
    surfaceLight: '#2A2A2A',  // Light gray
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textMuted: '#808080',
    
    // Semantic colors
    success: '#00FF88',
    warning: '#FFD700',
    error: '#FF4B4B',
    
    // Gradients
    gradient: ['#00D4FF', '#0099CC'],
    darkGradient: ['#1A1A1A', '#0A0A0A'],
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '900',
      letterSpacing: -1,
    },
    h2: {
      fontSize: 24,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 20,
      fontWeight: '700',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontSize: 14,
      fontWeight: '500',
    },
    tiny: {
      fontSize: 12,
      fontWeight: '500',
    },
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
};
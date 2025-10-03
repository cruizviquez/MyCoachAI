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
    background: '#0a0a0a',    // Premium black
    backgroundDarker: '#050505',
    surface: '#1a1a1a',        // Card dark
    surfaceLight: '#2a2a2a',   // Border gray

    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#888888',
    textMuted: '#666666',

    // Semantic colors
    success: '#00FF88',
    warning: '#FFD700',
    error: '#FF4B4B',

    // Accent
    accentCyan: '#00D4FF',
    accentGreen: '#00FF88',
    accentRed: '#FF4B4B',
    accentGold: '#FFD700',

    // Gradients
    gradient: ['#00D4FF', '#0099CC'],
    darkGradient: ['#0a0a0a', '#1a1a1a'],
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
import type { DefaultTheme } from 'styled-components';

export const themes: Record<'light' | 'dark', DefaultTheme> = {
  light: {
    colors: {
      background: '#fffdf9',
      surface: '#ffffff',
      text: '#17243a',
      mutedText: '#667085',
      border: '#e7e8eb',
      primary: '#17243a',
      accent: '#f28c28',
      footerBackground: '#17243a',
      footerText: '#f5f7fa',
      accentForeground: '#17243a',
    },
  },
  dark: {
    colors: {
      background: '#111827',
      surface: '#1b2638',
      text: '#f5f7fa',
      mutedText: '#aab4c3',
      border: '#344154',
      primary: '#f5f7fa',
      accent: '#ff9c3d',
      footerBackground: '#0b1220',
      footerText: '#f5f7fa',
      accentForeground: '#17243a',
    },
  },
};

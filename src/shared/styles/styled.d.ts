import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: string;
      mutedText: string;
      border: string;
      primary: string;
      accent: string;
      footerBackground: string;
      footerText: string;
      accentForeground: string;
    };
  }
}

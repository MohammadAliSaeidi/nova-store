import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, 
  *::before, 
  *::after { 
    box-sizing: border-box;
   }

  html, 
  body { 
    min-height: 100%; 
    margin: 0; 
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-store, Arial, sans-serif);
    -webkit-font-smoothing: antialiased;
  }

  a { 
    color: inherit; 
    text-decoration: none; 
  }

  button, 
  input, 
  select, 
  textarea { 
    font: inherit; 
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent}; 
    outline-offset: 3px; 
  }

  @media (prefers-reduced-motion: reduce) {
    *, 
    *::before, 
    *::after { 
      scroll-behavior: auto !important; 
      animation-duration: 0.01ms !important; 
      transition-duration: 0.01ms !important; 
    }
  }
`;

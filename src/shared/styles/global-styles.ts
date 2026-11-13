import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --nova-background: #fffdf9;
    --nova-surface: #ffffff;
    --nova-text: #17243a;
    --nova-muted-text: #667085;
    --nova-border: #e7e8eb;
    --nova-primary: #17243a;
    --nova-accent: #f28c28;
    --nova-footer-background: #17243a;
    --nova-footer-text: #f5f7fa;
    --nova-accent-foreground: #17243a;
  }

  html[data-theme="dark"] {
    --nova-background: #111827;
    --nova-surface: #1b2638;
    --nova-text: #f5f7fa;
    --nova-muted-text: #aab4c3;
    --nova-border: #344154;
    --nova-primary: #f5f7fa;
    --nova-accent: #ff9c3d;
    --nova-footer-background: #0b1220;
    --nova-footer-text: #f5f7fa;
    --nova-accent-foreground: #17243a;
  }

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
    background: var(--nova-background);
    color: var(--nova-text);
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
    outline: 3px solid var(--nova-accent);
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

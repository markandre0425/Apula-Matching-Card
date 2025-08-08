// Simple theme management utility to replace @replit/vite-plugin-shadcn-theme-json
import { useEffect, useState } from 'react';

// Default theme colors
const defaultTheme = {
  background: "hsl(0 0% 100%)",
  foreground: "hsl(222.2 84% 4.9%)",
  card: "hsl(0 0% 100%)",
  cardForeground: "hsl(222.2 84% 4.9%)",
  popover: "hsl(0 0% 100%)",
  popoverForeground: "hsl(222.2 84% 4.9%)",
  primary: "hsl(222.2 47.4% 11.2%)",
  primaryForeground: "hsl(210 40% 98%)",
  secondary: "hsl(210 40% 96.1%)",
  secondaryForeground: "hsl(222.2 47.4% 11.2%)",
  muted: "hsl(210 40% 96.1%)",
  mutedForeground: "hsl(215.4 16.3% 46.9%)",
  accent: "hsl(210 40% 96.1%)",
  accentForeground: "hsl(222.2 47.4% 11.2%)",
  destructive: "hsl(0 84.2% 60.2%)",
  destructiveForeground: "hsl(210 40% 98%)",
  border: "hsl(214.3 31.8% 91.4%)",
  input: "hsl(214.3 31.8% 91.4%)",
  ring: "hsl(222.2 84% 4.9%)",
  radius: "0.5rem"
};

export function useTheme() {
  const [theme, setTheme] = useState(defaultTheme);
  
  useEffect(() => {
    // Apply theme to CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);
  
  return { theme, setTheme };
}

// Initialize theme on app load
export function initializeTheme() {
  Object.entries(defaultTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
}
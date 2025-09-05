import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage (fallback: "light")
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  /**
   * Whenever `theme` changes:
   * - Update <html> and <body> with data-theme attribute
   * - Persist theme in localStorage
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore errors (e.g., in private browsing)
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext easily
export function useTheme() {
  return useContext(ThemeContext);
}

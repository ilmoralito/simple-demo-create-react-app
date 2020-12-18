import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context";

export default function ThemedButton({ children }) {
  const { theme, onToggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ backgroundColor: theme.background, color: theme.foreground }}
      onClick={onToggleTheme}
    >
      {children}
    </button>
  );
}

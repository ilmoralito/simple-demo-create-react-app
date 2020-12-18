import React from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#EEEEEE",
  },
  dark: {
    foreground: "#FFFFFF",
    background: "#222222",
  },
};

export const ThemeContext = React.createContext(themes.light);

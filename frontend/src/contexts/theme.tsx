import React, { createContext, useContext, useState, ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import { theme as defaultTheme } from "../assets/createTheme";
import { ThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export default ThemeContextProvider;

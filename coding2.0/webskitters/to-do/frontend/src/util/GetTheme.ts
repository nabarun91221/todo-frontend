import { createTheme, useMediaQuery } from "@mui/material";
import React from "react";

export const useThemeMode = () => {
  // Detect system dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Create theme based on the system preference
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return theme;
};

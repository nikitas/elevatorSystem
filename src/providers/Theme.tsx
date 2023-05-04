import { FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MuiThemeProvider
      theme={createTheme({
        palette: {
          background: {
            default: "#f0f0f0",
            paper: "#ffffff",
          },
        },
      })}
    >
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};


import "./App.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./components/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d4dfc",
      light: "#8b72ff",
      dark: "#4c2edc",
    },
    secondary: {
      main: "#ec4899",
      light: "#f9a8d4",
      dark: "#be185d",
    },
    success: {
      main: "#17b26a",
      light: "#dcfce7",
      dark: "#087443",
    },
    warning: {
      main: "#ff8a00",
      light: "#fff7ed",
      dark: "#c2410c",
    },
    background: {
      default: "#f8faff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111936",
      secondary: "#63708a",
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.4rem, 5vw, 4.25rem)',
      lineHeight: 0.98,
      letterSpacing: '-0.055em',
    },
    h4: {
      fontWeight: 800,
      fontSize: '1.35rem',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 800,
      fontSize: '1.125rem',
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 18px 60px rgba(17, 25, 54, 0.06)',
          border: '1px solid rgba(109, 77, 252, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 14px 45px rgba(17, 25, 54, 0.06)',
          border: '1px solid rgba(109, 77, 252, 0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 800,
          padding: '10px 22px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(109, 77, 252, 0.18)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6d4dfc 0%, #7c3aed 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5b3df0 0%, #6d28d9 100%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111936',
          boxShadow: '0 1px 0 rgba(109, 77, 252, 0.12)',
          borderBottom: '1px solid rgba(109, 77, 252, 0.10)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 800,
          minHeight: 48,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

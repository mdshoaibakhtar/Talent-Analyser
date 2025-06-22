
import "./App.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./components/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Modern indigo
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899", // Modern pink
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
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
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid rgb(241 245 249)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderBottom: '1px solid rgb(241 245 249)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
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

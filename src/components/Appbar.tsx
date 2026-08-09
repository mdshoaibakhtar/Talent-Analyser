import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AutoAwesome,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";

const navItems = ["Home", "Features", "How It Works", "About", "Contact"];

interface AppbarProps {
  onNewAnalysis?: () => void;
}

const Appbar: React.FC<AppbarProps> = ({ onNewAnalysis }) => {
  const { dispatch } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNewAnalysis = () => {
    dispatch({ type: "CLEAR_ALL" });
    onNewAnalysis?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ top: 0, zIndex: theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 68, md: 86 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr auto", md: "1fr auto 1fr" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            <Box
              aria-hidden
              sx={{
                width: 44,
                height: 44,
                mr: 1.5,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                color: "white",
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: -1,
                position: "relative",
                background: "linear-gradient(135deg, #5d6bff 0%, #7c3aed 100%)",
                boxShadow: "0 14px 28px rgba(109, 77, 252, 0.28)",
                "&::after": {
                  content: '"+"',
                  position: "absolute",
                  top: 5,
                  right: 7,
                  fontSize: 13,
                  lineHeight: 1,
                  color: "#b8f7ff",
                },
              }}
            >
              TA
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.05,
                  color: "text.primary",
                  fontSize: { xs: 17, md: 19 },
                  whiteSpace: "nowrap",
                }}
              >
                Talent Analyser
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                AI-Powered
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              component="nav"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { md: 3, lg: 4.5 },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  href={item === "Home" ? "#home" : `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  variant="text"
                  sx={{
                    color: item === "Home" ? "primary.main" : "text.primary",
                    p: 0,
                    minWidth: "auto",
                    borderRadius: 0,
                    fontSize: 14,
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "primary.main",
                      boxShadow: "none",
                    },
                    "&::after": item === "Home"
                      ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -11,
                        height: 3,
                        borderRadius: 99,
                        backgroundColor: "primary.main",
                      }
                      : undefined,
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            {isMobile && (
              <IconButton
                onClick={handleToggleSidebar}
                aria-label="Open results panel"
                sx={{ color: "text.primary" }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Button
              variant="contained"
              startIcon={<AutoAwesome sx={{ fontSize: 18 }} />}
              onClick={handleNewAnalysis}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                minWidth: 150,
                height: 44,
                boxShadow: "0 14px 28px rgba(109, 77, 252, 0.26)",
              }}
            >
              New Analysis
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;

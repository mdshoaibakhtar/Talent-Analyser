
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Description as ResumeIcon,
  Work as JobIcon,
  Compare as CompareIcon,
  Menu as MenuIcon,
  Clear as ClearIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";

const Appbar: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const handleToggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const totalItems = state.resumes.length + 
    (state.jobDescription ? 1 : 0) + 
    (state.comparisonResult ? 1 : 0);

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AnalyticsIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Talent Analyser
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mr: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={state.resumes.length} color="primary" 
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', minWidth: 20, height: 20 } }}>
                  <ResumeIcon sx={{ color: 'text.secondary' }} />
                </Badge>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Resumes
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={state.jobDescription ? 1 : 0} color="primary"
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', minWidth: 20, height: 20 } }}>
                  <JobIcon sx={{ color: 'text.secondary' }} />
                </Badge>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Job Description
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={state.comparisonResult ? 1 : 0} color="primary"
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', minWidth: 20, height: 20 } }}>
                  <CompareIcon sx={{ color: 'text.secondary' }} />
                </Badge>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Analysis
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleToggleSidebar}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              title="Toggle Results Panel"
            >
              <MenuIcon />
            </IconButton>
            
            {totalItems > 0 && (
              <Button
                onClick={handleClearAll}
                startIcon={<ClearIcon />}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                {!isMobile && "Clear All"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;

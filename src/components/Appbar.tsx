import React from "react";
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
} from "@mui/material";
import {
  Description as ResumeIcon,
  Work as JobIcon,
  Compare as CompareIcon,
  Menu as MenuIcon,
  Clear as ClearIcon,
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

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Talent Analyser
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge badgeContent={state.resumes.length} color="secondary">
              <ResumeIcon />
            </Badge>
            <Typography variant="body2">Resumes</Typography>

            <Badge
              badgeContent={state.jobDescription ? 1 : 0}
              color="secondary"
            >
              <JobIcon />
            </Badge>
            <Typography variant="body2">Job Description</Typography>

            <Badge
              badgeContent={state.comparisonResult ? 1 : 0}
              color="secondary"
            >
              <CompareIcon />
            </Badge>
            <Typography variant="body2">Analysis</Typography>
          </Box>
        )}

        <Box sx={{ ml: 2 }}>
          <IconButton
            color="inherit"
            onClick={handleToggleSidebar}
            title="Toggle Results Panel"
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleClearAll}
            startIcon={<ClearIcon />}
            sx={{ ml: 1 }}
          >
            {isMobile ? "" : "Clear All"}
          </Button>
          {!isMobile &&
            state.resumes.length +
              (state.jobDescription ? 1 : 0) +
              (state.comparisonResult ? 1 : 0) >
              0 && (
              <Button
                color="inherit"
                onClick={handleClearAll}
                startIcon={<ClearIcon />}
                sx={{ ml: 1 }}
              >
                {isMobile ? "" : "Clear All"}
              </Button>
            )}
        </Box>
      </Toolbar>
      {/* TODO: Investigate why the ClearIcon is showing even when the sidebar is closed. */}
    </AppBar>
  );
};

export default Appbar;

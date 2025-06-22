import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
} from "@mui/material";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Description as ResumeIcon,
  Work as JobIcon,
  Compare as CompareIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";

const ResultsSidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleClose = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <Drawer
      anchor="right"
      open={state.sidebarOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400, md: 500 },
          p: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Results Panel
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Resumes Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ResumeIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Resumes ({state.resumes.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {state.resumes.length === 0 ? (
            <Typography color="text.secondary">No resumes uploaded</Typography>
          ) : (
            state.resumes.map((resume) => (
              <Paper key={resume.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                    {resume.file.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={resume.extractedData ? "Processed" : "Processing"}
                    color={resume.extractedData ? "success" : "default"}
                  />
                </Box>
                {resume.extractedData && (
                  <Typography
                    variant="body2"
                    sx={{
                      maxHeight: 150,
                      overflow: "auto",
                      bgcolor: "grey.50",
                      p: 1,
                      borderRadius: 1,
                      fontSize: "0.8rem",
                    }}
                  >
                    {resume.extractedData.substring(0, 200)}...
                  </Typography>
                )}
              </Paper>
            ))
          )}
        </AccordionDetails>
      </Accordion>

      {/* Job Description Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <JobIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Job Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {state.jobDescription ? (
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  Job Description
                </Typography>
                <Chip
                  size="small"
                  label={state.jobDescription.source.toUpperCase()}
                  color="primary"
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  maxHeight: 150,
                  overflow: "auto",
                  bgcolor: "grey.50",
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                }}
              >
                {state.jobDescription.data.substring(0, 200)}...
              </Typography>
            </Paper>
          ) : (
            <Typography color="text.secondary">
              No job description loaded
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Comparison Results Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CompareIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Analysis Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {state.comparisonResult ? (
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  bgcolor: "grey.50",
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {state.comparisonResult}
              </Typography>
            </Paper>
          ) : (
            <Typography color="text.secondary">
              No analysis results yet
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default ResultsSidebar;

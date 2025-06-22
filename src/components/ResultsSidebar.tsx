
import React from 'react';
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
} from '@mui/material';
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Description as ResumeIcon,
  Work as JobIcon,
  Compare as CompareIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const ResultsSidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <Drawer
      anchor="right"
      open={state.sidebarOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400, md: 500 },
          p: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                    {resume.file.name}
                  </Typography>
                  <Chip
                    size="small"
                    label={resume.extractedData ? 'Processed' : 'Processing'}
                    color={resume.extractedData ? 'success' : 'default'}
                  />
                </Box>
                {resume.extractedData && (
                  <Typography
                    variant="body2"
                    sx={{
                      maxHeight: 150,
                      overflow: 'auto',
                      bgcolor: 'grey.50',
                      p: 1,
                      borderRadius: 1,
                      fontSize: '0.8rem',
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                  overflow: 'auto',
                  bgcolor: 'grey.50',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.8rem',
                }}
              >
                {state.jobDescription.data.substring(0, 200)}...
              </Typography>
            </Paper>
          ) : (
            <Typography color="text.secondary">No job description loaded</Typography>
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
                  overflow: 'auto',
                  bgcolor: 'grey.50',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {state.comparisonResult}
              </Typography>
            </Paper>
          ) : (
            <Typography color="text.secondary">No analysis results yet</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default ResultsSidebar;
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const ResultsSidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <Drawer
      anchor="right"
      open={state.sidebarOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : 500,
          p: 3,
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Analysis Results
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {state.comparisonResult ? (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Chip 
              icon={<TrendingUpIcon />}
              label="AI Analysis Complete" 
              color="success" 
              sx={{ fontWeight: 500 }}
            />
          </Box>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Comparison Summary
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {state.comparisonResult}
            </Typography>
          </Paper>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Analysis Details
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Resumes Analyzed"
                secondary={`${state.resumes.filter(r => r.extractedData).length} out of ${state.resumes.length} uploaded`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Job Description Source"
                secondary={state.jobDescription?.source === 'url' ? 'URL' : 'PDF Upload'}
              />
            </ListItem>
          </List>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <AssessmentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No Analysis Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload resumes and add a job description, then click "Start Analysis" to see results here.
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default ResultsSidebar;

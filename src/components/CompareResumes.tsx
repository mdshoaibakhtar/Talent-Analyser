
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Compare as CompareIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { apiEndPoint, API_ENDPOINTS } from './Constant';

const CompareResumes: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleCompare = async () => {
    if (state.resumes.length === 0 || !state.jobDescription) {
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: { key: 'comparing', value: true } });

    try {
      const resumeData = state.resumes
        .filter(resume => resume.extractedData)
        .map(resume => resume.extractedData)
        .join('\n\n--- Next Resume ---\n\n');

      const response = await axios.post(apiEndPoint + API_ENDPOINTS.FIND_DIFF, {
        resume_data: resumeData,
        job_description: state.jobDescription.data
      });

      dispatch({
        type: 'SET_COMPARISON_RESULT',
        payload: response.data.response
      });

      // Open sidebar to show results
      if (!state.sidebarOpen) {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
      }
    } catch (error) {
      console.error('Error comparing resumes:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'comparing', value: false } });
    }
  };

  const canCompare = state.resumes.some(r => r.extractedData) && state.jobDescription;
  const processedResumesCount = state.resumes.filter(r => r.extractedData).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Compare & Analyze
      </Typography>

      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CompareIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="body1" paragraph>
          Ready to analyze {processedResumesCount} resume(s) against the job description
        </Typography>

        {!canCompare && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Please upload at least one resume and a job description to start analysis
          </Alert>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={handleCompare}
          disabled={!canCompare || state.loading.comparing}
          startIcon={state.loading.comparing ? <CircularProgress size={20} /> : <CompareIcon />}
        >
          {state.loading.comparing ? 'Analyzing...' : 'Start Analysis'}
        </Button>

        {state.comparisonResult && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Analysis complete! Check the results panel.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default CompareResumes;

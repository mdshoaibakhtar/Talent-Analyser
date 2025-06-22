
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Compare as CompareIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
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
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
          Compare & Analyze
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered analysis to match candidates with job requirements
        </Typography>
      </Box>

      <Card sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '50%',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}>
            <AnalyticsIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Ready to analyze {processedResumesCount} resume{processedResumesCount !== 1 ? 's' : ''}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
            <Chip 
              icon={<TrendingUpIcon />}
              label="AI-Powered" 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
            <Chip 
              label="Smart Matching" 
              color="secondary" 
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Box>

          {!canCompare && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                '& .MuiAlert-message': { fontWeight: 500 }
              }}
            >
              Please upload at least one resume and a job description to start analysis
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleCompare}
            disabled={!canCompare || state.loading.comparing}
            startIcon={state.loading.comparing ? <CircularProgress size={20} color="inherit" /> : <CompareIcon />}
            sx={{ 
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              minWidth: 180,
            }}
          >
            {state.loading.comparing ? 'Analyzing...' : 'Start Analysis'}
          </Button>

          {state.comparisonResult && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                '& .MuiAlert-message': { fontWeight: 500 }
              }}
            >
              ✨ Analysis complete! Check the results panel for detailed insights.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompareResumes;

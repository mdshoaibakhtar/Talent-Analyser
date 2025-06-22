import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Compare as CompareIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { apiEndPoint, prompt } from './Constant';

interface CompareInterface {
  uploadedJobDescription: { file_name: string; base64: string };
  uploadedResume: { file_name: string; base64: string };
}

const CompareResumes: React.FC<CompareInterface> = ({ uploadedJobDescription, uploadedResume }) => {
  const [comparing, setComparing] = useState(false);
  const handleCompare = async () => {
    if (!uploadedResume.base64 || !uploadedJobDescription.base64) {
      return;
    }
    setComparing(true);
    try {
      const axios = (await import('axios')).default;
      await axios.post(apiEndPoint + '/data-analysis', {
        resume_base64: uploadedResume.base64,
        jd_base64: uploadedJobDescription.base64,
        prompt: prompt
      }).then((response) => {
        console.log('Analysis response:', response.data);
      })
      // handle response as needed
    } catch (error) {
      // handle error as needed
    } finally {
      setComparing(false);
    }
  }
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
            Ready to analyze {uploadedResume.file_name}
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

          {/* {!canCompare && (
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
          )} */}

          <Button
            variant="contained"
            size="large"
            onClick={handleCompare}
            disabled={uploadedResume.file_name === '' || uploadedJobDescription.file_name === ''}
            startIcon={comparing ? <CircularProgress size={20} color="inherit" /> : <CompareIcon />}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              minWidth: 180,
            }}
          >
            {comparing ? 'Analyzing...' : 'Start Analysis'}
          </Button>

          {/* {state.comparisonResult && (
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
          )} */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompareResumes;
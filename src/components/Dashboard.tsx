
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Appbar from './Appbar';
import UploadResume from './UploadResume';
import JobDescription from './JobDescription';
import CompareResumes from './CompareResumes';
import ResultsSidebar from './ResultsSidebar';
import Footer from './Footer';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Appbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
        color: 'white', 
        py: 6,
        mb: 4
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ mb: 2, color: 'white' }}>
              AI-Powered Resume Analysis
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Upload resumes, add job descriptions, and get intelligent matching insights powered by advanced AI
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper sx={{ 
              p: 4, 
              height: 'fit-content',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              }
            }}>
              <UploadResume />
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, lg: 6 }}>
            <Grid container spacing={4}>
              <Grid size={12}>
                <Paper sx={{ 
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  }
                }}>
                  <JobDescription />
                </Paper>
              </Grid>
              
              <Grid size={12}>
                <Paper sx={{ 
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  }
                }}>
                  <CompareResumes />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <ResultsSidebar />
      <Footer />
    </Box>
  );
};

export default Dashboard;


import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appbar />
      
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <UploadResume />
            </Paper>
          </Grid>
          
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <JobDescription />
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
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

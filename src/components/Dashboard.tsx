
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Avatar,
  LinearProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import React from 'react';
import {
  TrendingUp,
  People,
  Assignment,
  Analytics,
  Star,
  CheckCircle,
  Schedule,
  Business,
  LocationOn,
  ArrowForward,
  Bookmark,
  Share,
} from '@mui/icons-material';
import Appbar from './Appbar';
import UploadResume from './UploadResume';
import JobDescription from './JobDescription';
import CompareResumes from './CompareResumes';
import ResultsSidebar from './ResultsSidebar';
import Footer from './Footer';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    { label: 'Resumes Analyzed', value: '1,247', icon: Assignment, color: '#6366f1' },
    { label: 'Job Matches', value: '892', icon: TrendingUp, color: '#10b981' },
    { label: 'Active Candidates', value: '456', icon: People, color: '#f59e0b' },
    { label: 'Success Rate', value: '94%', icon: Analytics, color: '#ec4899' },
  ];

  const recentJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Remote',
      salary: '$120k - $160k',
      applicants: 45,
      posted: '2 days ago',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'New York, NY',
      type: 'Hybrid',
      salary: '$130k - $180k',
      applicants: 32,
      posted: '1 week ago',
      skills: ['Product Strategy', 'Analytics', 'Leadership'],
    },
    {
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'Austin, TX',
      type: 'On-site',
      salary: '$110k - $150k',
      applicants: 28,
      posted: '3 days ago',
      skills: ['Python', 'Machine Learning', 'SQL'],
    },
  ];

  const topCandidates = [
    {
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      match: 95,
      experience: '5+ years',
      skills: ['React', 'Python', 'AWS'],
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'DevOps Engineer',
      match: 92,
      experience: '4+ years',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      match: 88,
      experience: '6+ years',
      skills: ['Figma', 'User Research', 'Prototyping'],
      avatar: 'ER',
    },
  ];

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

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ 
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                border: `1px solid ${stat.color}20`,
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                      <stat.icon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 6 }}>
        <Grid container spacing={4}>
          {/* Main Tools Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
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
              
              <Grid size={{ xs: 12, md: 6 }}>
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

            {/* Recent Job Posts */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Latest Job Opportunities
              </Typography>
              <Grid container spacing={3}>
                {recentJobs.map((job, index) => (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                    <Card sx={{ 
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-4px)', 
                        boxShadow: 4 
                      }
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Business sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {job.company}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {job.location} • {job.type}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton size="small">
                            <Bookmark />
                          </IconButton>
                        </Box>
                        
                        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}>
                          {job.salary}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          {job.skills.map((skill, idx) => (
                            <Chip 
                              key={idx}
                              label={skill} 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }}
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <People sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {job.applicants} applicants
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {job.posted}
                          </Typography>
                        </Box>

                        <Button 
                          fullWidth 
                          variant="contained" 
                          endIcon={<ArrowForward />}
                          sx={{ mt: 2 }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Sidebar Content */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Top Candidates */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Top Matched Candidates
              </Typography>
              <List sx={{ p: 0 }}>
                {topCandidates.map((candidate, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {candidate.avatar}
                      </Avatar>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {candidate.name}
                            </Typography>
                            <Chip 
                              label={`${candidate.match}% match`} 
                              size="small" 
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {candidate.role} • {candidate.experience}
                            </Typography>
                            <Box>
                              {candidate.skills.map((skill, idx) => (
                                <Chip 
                                  key={idx}
                                  label={skill} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < topCandidates.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                View All Candidates
              </Button>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem button sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Assignment color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Bulk Resume Upload" />
                </ListItem>
                <ListItem button sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Analytics color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Generate Report" />
                </ListItem>
                <ListItem button sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Schedule Interviews" />
                </ListItem>
                <ListItem button sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Share color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Share Results" />
                </ListItem>
              </List>
            </Paper>

            {/* Recent Activity */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Resume analyzed successfully"
                    secondary="2 minutes ago"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TrendingUp sx={{ color: 'warning.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="New job description added"
                    secondary="1 hour ago"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Star sx={{ color: 'info.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="5 candidates shortlisted"
                    secondary="3 hours ago"
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ResultsSidebar />
      <Footer />
    </Box>
  );
};

export default Dashboard;

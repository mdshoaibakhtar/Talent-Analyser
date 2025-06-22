
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import {
    TrendingUp,
    People,
    Assignment,
    Analytics,
} from '@mui/icons-material';
import Appbar from './Appbar';
import UploadResume from './UploadResume';
import JobDescription from './JobDescription';
import CompareResumes from './CompareResumes';
import ResultsSidebar from './ResultsSidebar';
import Footer from './Footer';

interface files{
    file_name: string;
    base64: string;
}

const Dashboard: React.FC = () => {
  const [uploadedResume, setUploadedResume] = useState<files>({'file_name':'', 'base64':''});
  const [uploadedJobDescription, setUploadedJobDescription] = useState<files>({'file_name':'', 'base64':''});


    const stats = [
        { label: 'Resumes Analyzed', value: '1,247', icon: Assignment, color: '#6366f1' },
        { label: 'Job Matches', value: '892', icon: TrendingUp, color: '#10b981' },
        { label: 'Active Candidates', value: '456', icon: People, color: '#f59e0b' },
        { label: 'Success Rate', value: '94%', icon: Analytics, color: '#ec4899' },
    ];

    // console.log(uploadedResume)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Appbar />
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
            {/* Upload section */}
            <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 6 }}>
                {/* Main Tools Section */}
                <Grid container spacing={4} size={{ xs: 12, lg: 8 }}>
                    <Grid container spacing={6} flex={1} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{
                                p: 4,
                                height: 'fit-content',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                                }
                            }}>
                                <UploadResume setUploadedResume={setUploadedResume} uploadedResume={uploadedResume}/>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{
                                p: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                                }
                            }}>
                                <JobDescription uploadedJobDescription={uploadedJobDescription} setUploadedJobDescription={setUploadedJobDescription} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid size={12}>
                        <Paper sx={{
                            p: 4,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                            }
                        }}>
                            <CompareResumes uploadedJobDescription={uploadedJobDescription} uploadedResume={uploadedResume} />
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

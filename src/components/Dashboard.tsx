import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
    AutoAwesome,
    CheckCircle,
    Description,
    Groups,
    TrackChanges,
    TrendingUp,
} from '@mui/icons-material';
import Appbar from './Appbar';
import UploadResume from './UploadResume';
import JobDescription from './JobDescription';
import CompareResumes from './CompareResumes';
import ResultsSidebar from './ResultsSidebar';
import Footer from './Footer';

interface Files {
    file_name: string;
    base64: string;
}

const stats = [
    {
        label: 'Resumes Analyzed',
        value: '1,247',
        note: 'This Month',
        icon: Description,
        color: '#5b50f4',
    },
    {
        label: 'Job Matches',
        value: '892',
        note: 'This Month',
        icon: TrendingUp,
        color: '#17b26a',
    },
    {
        label: 'Active Candidates',
        value: '456',
        note: 'This Month',
        icon: Groups,
        color: '#ff8a00',
    },
    {
        label: 'Success Rate',
        value: '94%',
        note: 'Excellent Matches',
        icon: TrackChanges,
        color: '#ec4899',
    },
];

const heroBadges = ['Smart Matching', 'ATS Optimization', 'Actionable Insights'];

function HeroIllustration() {
    return (
        <Box
            aria-hidden
            sx={{
                position: 'relative',
                height: { xs: 270, md: 340 },
                minWidth: { md: 480 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    width: 210,
                    height: 58,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(92, 225, 255, 0.95) 0%, rgba(99, 102, 241, 0.75) 42%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0) 70%)',
                    boxShadow: '0 0 54px rgba(92, 225, 255, 0.64)',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 66,
                    width: 230,
                    height: 218,
                    clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0 100%)',
                    background: 'linear-gradient(180deg, rgba(133, 185, 255, 0.34), rgba(133, 185, 255, 0.03))',
                    filter: 'blur(0.2px)',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: 34, md: 22 },
                    right: { xs: 40, md: 78 },
                    width: 116,
                    height: 154,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.92)',
                    transform: 'rotate(8deg)',
                    boxShadow: '0 22px 50px rgba(0,0,0,0.22)',
                    p: 2,
                }}
            >
                <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#a78bfa' }} />
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ height: 7, borderRadius: 99, bgcolor: '#7567f8', mb: 0.8 }} />
                        <Box sx={{ height: 6, width: '60%', borderRadius: 99, bgcolor: '#a7b2ff' }} />
                    </Box>
                </Box>
                {[0, 1, 2, 3].map((item) => (
                    <Box
                        key={item}
                        sx={{
                            height: 7,
                            borderRadius: 99,
                            bgcolor: item === 0 ? '#cad4ff' : 'rgba(99, 102, 241, 0.24)',
                            width: `${90 - item * 13}%`,
                            mb: 1.2,
                        }}
                    />
                ))}
            </Box>

            {[0, 1, 2].map((item) => (
                <Box
                    key={item}
                    sx={{
                        position: 'absolute',
                        left: item === 2 ? { xs: 40, md: 62 } : { xs: 32, md: 46 },
                        right: item === 2 ? 'auto' : undefined,
                        top: item === 0 ? 70 : item === 1 ? 126 : undefined,
                        bottom: item === 2 ? 98 : undefined,
                        width: item === 2 ? 92 : 122,
                        height: 50,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(113, 94, 255, 0.66), rgba(34, 211, 238, 0.22))',
                        border: '1px solid rgba(255,255,255,0.16)',
                        boxShadow: '0 16px 36px rgba(0,0,0,0.16)',
                        transform: item === 0 ? 'rotate(7deg)' : item === 1 ? 'rotate(-5deg)' : 'rotate(10deg)',
                        p: 1.1,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center', mb: 0.7 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#8fb6ff' }} />
                        <Box sx={{ height: 5, width: '46%', borderRadius: 99, bgcolor: '#9df3ff' }} />
                    </Box>
                    <Box sx={{ height: 4, width: '76%', borderRadius: 99, bgcolor: 'rgba(255,255,255,0.4)', mb: 0.6 }} />
                    <Box sx={{ height: 4, width: '54%', borderRadius: 99, bgcolor: 'rgba(255,255,255,0.3)' }} />
                </Box>
            ))}

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 90,
                    width: 98,
                    height: 78,
                    borderRadius: '44px 44px 34px 34px',
                    background: 'linear-gradient(180deg, #ffffff 0%, #c7e9ff 100%)',
                    boxShadow: '0 24px 40px rgba(0, 0, 0, 0.22)',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 66,
                        height: 36,
                        borderRadius: 999,
                        bgcolor: '#243279',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.8,
                    }}
                >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#60efff' }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#60efff' }} />
                </Box>
            </Box>
        </Box>
    );
}

const Dashboard: React.FC = () => {
    const [uploadedResume, setUploadedResume] = useState<Files>({ file_name: '', base64: '' });
    const [uploadedJobDescription, setUploadedJobDescription] = useState<Files>({ file_name: '', base64: '' });

    const handleNewAnalysis = () => {
        setUploadedResume({ file_name: '', base64: '' });
        setUploadedJobDescription({ file_name: '', base64: '' });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Appbar onNewAnalysis={handleNewAnalysis} />

            <Box
                id="home"
                component="section"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white',
                    background: 'linear-gradient(135deg, #2938e8 0%, #2810a6 50%, #16005f 100%)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px)',
                        backgroundSize: '16px 16px',
                        opacity: 0.18,
                        maskImage: 'linear-gradient(90deg, #000 0%, transparent 36%)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '-8%',
                        bottom: '-22%',
                        width: '70%',
                        height: '72%',
                        background: 'repeating-radial-gradient(ellipse at center, rgba(130, 102, 255, 0.22) 0 1px, transparent 1px 15px)',
                        transform: 'rotate(-8deg)',
                        opacity: 0.7,
                    },
                }}
            >
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ minHeight: { xs: 520, md: 330 }, py: { xs: 6, md: 4 } }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ maxWidth: 610 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Typography variant="h1" component="h1" sx={{ color: 'white' }}>
                                        AI-Powered
                                    </Typography>
                                    <AutoAwesome sx={{ fontSize: { xs: 34, md: 42 }, color: '#8be9ff', mb: { xs: 0, md: 2 } }} />
                                </Stack>
                                <Typography variant="h1" component="p" sx={{ color: 'white', mb: 2.5 }}>
                                    Talent Analysis
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'rgba(255,255,255,0.92)',
                                        fontWeight: 500,
                                        lineHeight: 1.65,
                                        maxWidth: 560,
                                        mb: 4,
                                    }}
                                >
                                    Upload your resume and job description to get instant AI insights,
                                    match scores, ATS analysis, and personalized recommendations.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.2} useFlexGap flexWrap="wrap">
                                    {heroBadges.map((badge) => (
                                        <Chip
                                            key={badge}
                                            icon={<CheckCircle sx={{ color: 'white !important', fontSize: 18 }} />}
                                            label={badge}
                                            sx={{
                                                alignSelf: { xs: 'flex-start', sm: 'center' },
                                                color: 'white',
                                                bgcolor: 'transparent',
                                                '& .MuiChip-label': {
                                                    px: 0.5,
                                                    fontWeight: 800,
                                                },
                                                '& .MuiChip-icon': {
                                                    borderRadius: '50%',
                                                    bgcolor: '#8b5cf6',
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <HeroIllustration />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="xl" component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 4 } }}>
                <Grid container spacing={2.5} sx={{ mb: 3 }}>
                    {stats.map((stat) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                            <Card
                                sx={{
                                    height: '100%',
                                    background: `linear-gradient(135deg, ${stat.color}12 0%, #ffffff 78%)`,
                                    borderColor: `${stat.color}28`,
                                    transition: 'transform 180ms ease, box-shadow 180ms ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: `0 20px 44px ${stat.color}18`,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: `${stat.color}16`,
                                            color: stat.color,
                                        }}
                                    >
                                        <stat.icon />
                                    </Avatar>
                                    <Box>
                                        <Typography sx={{ color: stat.color, fontWeight: 900, fontSize: 30, lineHeight: 1 }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography sx={{ color: 'text.primary', fontWeight: 800, lineHeight: 1.2, mt: 0.8 }}>
                                            {stat.label}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.3 }}>
                                            {stat.note}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={2.5} id="features" sx={{ mb: 2.5 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
                            <UploadResume setUploadedResume={setUploadedResume} uploadedResume={uploadedResume} />
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
                            <JobDescription
                                uploadedJobDescription={uploadedJobDescription}
                                setUploadedJobDescription={setUploadedJobDescription}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <CompareResumes
                    uploadedJobDescription={uploadedJobDescription}
                    uploadedResume={uploadedResume}
                />
            </Container>

            <ResultsSidebar />
            <Footer />
        </Box>
    );
};

export default Dashboard;

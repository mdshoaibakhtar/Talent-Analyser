import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  AutoAwesome,
  BarChart,
  CheckCircle,
  Compare as CompareIcon,
  CompareArrows,
  ErrorOutline,
  Hub,
  Psychology,
  RocketLaunch,
  TrackChanges,
} from '@mui/icons-material';
import { apiEndPoint, prompt } from './Constant';
import DialogBox from './DialogBox';
import { useAppContext } from '../context/AppContext';

interface CompareInterface {
  uploadedJobDescription: { file_name: string; base64: string };
  uploadedResume: { file_name: string; base64: string };
}

type CompareState = 'idle' | 'loading' | 'done' | 'failed';

type AnalysisData = {
  summary?: string;
  matching_score?: number | string;
  resume_ats_score?: number | string;
  matching?: Record<string, unknown>;
  missing?: Record<string, unknown>;
  points_needs_to_be_replace_and_added_in_the_resume?: unknown[];
  note_of_improvement?: unknown[];
  [key: string]: unknown;
};

const defaultSkills = [
  { label: 'React.js', value: 95 },
  { label: 'JavaScript/TypeScript', value: 90 },
  { label: 'HTML/CSS', value: 95 },
  { label: 'Tailwind CSS', value: 85 },
  { label: 'Node.js', value: 70 },
  { label: 'REST APIs', value: 88 },
];

const defaultStrengths = [
  'Strong React.js experience',
  'Good TypeScript knowledge',
  'Relevant project experience',
  'Modern frontend technologies',
  'API integration skills',
];

const defaultImprovements = [
  'Add more backend experience',
  'Include testing frameworks',
  'Cloud platform experience',
  'System design knowledge',
];

const defaultRecommendations = [
  'Good keyword density',
  'Well-structured content',
  'Proper section organization',
  'No formatting issues',
];

const scoreDefaults = {
  match: 89,
  ats: 92,
  skills: 85,
  experience: 90,
  keyword: 88,
};

function clampScore(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(100, Math.max(0, Math.round(numeric)));
}

function flattenItems(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.flatMap(flattenItems);
  }

  if (typeof value === 'object') {
    const item = value as Record<string, unknown>;
    const label = item.text ?? item.label ?? item.name ?? item.add ?? item.replace;
    if (typeof label === 'string') return [label];

    return Object.values(item).flatMap(flattenItems);
  }

  return [String(value)].filter(Boolean);
}

function MatchRing({ value }: { value: number }) {
  return (
    <Box
      sx={{
        width: { xs: 150, md: 176 },
        height: { xs: 150, md: 176 },
        borderRadius: '50%',
        background: `conic-gradient(#6d4dfc ${value * 3.6}deg, #d8ceff ${value * 3.6}deg 360deg)`,
        display: 'grid',
        placeItems: 'center',
        boxShadow: 'inset 0 0 0 1px rgba(109, 77, 252, 0.10)',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: '78%',
          height: '78%',
          borderRadius: '50%',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          boxShadow: '0 12px 26px rgba(109, 77, 252, 0.10)',
        }}
      >
        <Typography sx={{ fontSize: { xs: 30, md: 38 }, lineHeight: 1, fontWeight: 900, color: 'text.primary' }}>
          {value}%
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 800, color: 'text.secondary', mt: 0.7 }}>
          Match Score
        </Typography>
        <Box
          sx={{
            px: 1.1,
            py: 0.45,
            mt: 0.8,
            borderRadius: 999,
            bgcolor: 'success.light',
            color: 'success.dark',
            fontSize: 11,
            fontWeight: 900,
          }}
        >
          Excellent Match
        </Box>
      </Box>
    </Box>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: 82,
        boxShadow: 'none',
        borderColor: `${color}28`,
        background: `linear-gradient(135deg, ${color}10 0%, #fff 76%)`,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          bgcolor: `${color}16`,
          color,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 23 }} />
      </Box>
      <Box>
        <Typography sx={{ color, fontSize: 23, lineHeight: 1, fontWeight: 900 }}>
          {value}{suffix}
        </Typography>
        <Typography sx={{ color: 'text.primary', fontSize: 12.5, fontWeight: 800, mt: 0.7 }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
        <Typography sx={{ color: 'text.primary', fontSize: 13, fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography sx={{ color: 'text.primary', fontSize: 13, fontWeight: 800 }}>
          {value}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 4,
          borderRadius: 999,
          bgcolor: '#e9ecf4',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            background: 'linear-gradient(90deg, #7c3aed 0%, #5b50f4 100%)',
          },
        }}
      />
    </Box>
  );
}

function Checklist({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'success' | 'warning';
}) {
  const isSuccess = tone === 'success';

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: isSuccess ? 'rgba(23, 178, 106, 0.18)' : 'rgba(239, 68, 68, 0.18)',
        bgcolor: isSuccess ? 'rgba(23, 178, 106, 0.06)' : 'rgba(239, 68, 68, 0.06)',
      }}
    >
      <Typography sx={{ color: isSuccess ? 'success.dark' : '#dc2626', fontWeight: 900, mb: 1.2 }}>
        {title}
      </Typography>
      <Stack spacing={0.8}>
        {items.map((item) => (
          <Stack key={item} direction="row" spacing={1} alignItems="flex-start">
            {isSuccess ? (
              <CheckCircle sx={{ color: 'success.main', fontSize: 16, mt: 0.1 }} />
            ) : (
              <ErrorOutline sx={{ color: '#ef4444', fontSize: 16, mt: 0.1 }} />
            )}
            <Typography sx={{ color: 'text.primary', fontSize: 12.5, fontWeight: 650 }}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function AtsGauge({ value }: { value: number }) {
  return (
    <Box sx={{ textAlign: 'center', pt: 1 }}>
      <Box
        sx={{
          width: 172,
          height: 172,
          mx: 'auto',
          borderRadius: '50%',
          background: `conic-gradient(#17b26a ${value * 3.6}deg, #d9f2e7 ${value * 3.6}deg 360deg)`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 126,
            height: 126,
            borderRadius: '50%',
            bgcolor: 'white',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box>
            <Typography sx={{ color: 'success.main', fontWeight: 900, fontSize: 29, lineHeight: 1 }}>
              {value}/100
            </Typography>
            <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: 12, mt: 0.7 }}>
              ATS Score
            </Typography>
            <Typography sx={{ color: 'success.dark', fontWeight: 900, fontSize: 12, mt: 0.7 }}>
              Highly Optimized
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const CompareResumes: React.FC<CompareInterface> = ({ uploadedJobDescription, uploadedResume }) => {
  const { state, dispatch } = useAppContext();
  const [comparing, setComparing] = useState<CompareState>('idle');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AnalysisData>({});
  const [activeTab, setActiveTab] = useState(0);

  const isUrl = state.jobDescription?.source === 'url';
  const canCompare = Boolean(uploadedResume.base64 && (isUrl ? state.jobDescription?.data : uploadedJobDescription.base64));

  const matchScore = clampScore(data.matching_score, scoreDefaults.match);
  const atsScore = clampScore(data.resume_ats_score, scoreDefaults.ats);
  const matchingItems = flattenItems(data.matching?.skills ?? data.matching?.technical_skills ?? data.matching).slice(0, 6);
  const missingItems = flattenItems(data.missing?.skills ?? data.missing?.technical_skills ?? data.missing).slice(0, 5);
  const recommendations = flattenItems(data.note_of_improvement).slice(0, 4);

  const skillRows = matchingItems.length
    ? matchingItems.map((label, index) => ({ label, value: Math.max(70, 96 - index * 5) }))
    : defaultSkills;

  const strengths = matchingItems.length ? matchingItems.slice(0, 5) : defaultStrengths;
  const improvements = missingItems.length ? missingItems : defaultImprovements;
  const atsNotes = recommendations.length ? recommendations : defaultRecommendations;

  const handleCompare = async () => {
    if (!canCompare) return;

    setComparing('loading');
    try {
      const axios = (await import('axios')).default;
      const response = await axios.post(apiEndPoint + '/data-analysis', {
        resume_base64: uploadedResume.base64,
        jd_base64: isUrl ? state.jobDescription?.data : uploadedJobDescription.base64,
        prompt,
        is_url: isUrl,
      });

      const responseData = response.data as { data?: AnalysisData } & AnalysisData;
      const analysis = responseData.data && typeof responseData.data === 'object'
        ? responseData.data
        : responseData;

      setData(analysis);
      dispatch({
        type: 'SET_COMPARISON_RESULT',
        payload: JSON.stringify(analysis, null, 2),
      });
      setComparing('done');
    } catch (error) {
      setComparing('failed');
      console.error('Error comparing resumes:', error);
    }
  };

  const handlePrimaryAction = () => {
    if (comparing === 'done') {
      setOpen(true);
      return;
    }

    void handleCompare();
  };

  return (
    <Box id="how-it-works">

      <Paper
        id="contact"
        sx={{
          p: { xs: 2.2, md: 2.8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, rgba(109, 77, 252, 0.08) 0%, rgba(255,255,255,0.95) 55%, rgba(109, 77, 252, 0.04) 100%)',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              color: 'primary.main',
              bgcolor: 'rgba(109, 77, 252, 0.12)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <RocketLaunch sx={{ fontSize: 34 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: 'primary.dark', mb: 0.5 }}>
              Ready to find the perfect match?
            </Typography>
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
              Analyze more candidates and build your dream team with AI-powered insights.
            </Typography>
            {comparing === 'failed' && (
              <Typography sx={{ color: '#dc2626', fontWeight: 800, mt: 0.8 }}>
                Analysis failed. Check the API connection and try again.
              </Typography>
            )}
          </Box>
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handlePrimaryAction}
          disabled={!canCompare || comparing === 'loading'}
          startIcon={comparing === 'loading' ? <CircularProgress size={18} color="inherit" /> : <CompareIcon />}
          sx={{ minWidth: 182, height: 52 }}
        >
          {comparing === 'loading' ? 'Analyzing...' : comparing === 'done' ? 'View Analysis' : 'Start Analysis'}
        </Button>

        <DialogBox open={open} onClose={() => setOpen(false)} data={data} />
      </Paper>

      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 2.5,
          mt: 2.5,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '260px 1fr' },
          gap: { xs: 3, lg: 3.5 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pr: { lg: 3 },
            borderRight: { lg: '1px solid rgba(109, 77, 252, 0.16)' },
          }}
        >
          <MatchRing value={matchScore} />
        </Box>

        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {matchScore >= 80 ? 'Great Match! 🎉' : matchScore >= 60 ? 'Good Match' : 'Needs Review'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2.4, fontWeight: 600, maxWidth: 840 }}>
            {data.summary || 'This candidate is an excellent fit for the role based on skills, experience and job requirements.'}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard icon={BarChart} label="ATS Score" value={atsScore} suffix="/100" color="#17b26a" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard icon={Hub} label="Skills Match" value={scoreDefaults.skills} suffix="%" color="#ff8a00" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard icon={BarChart} label="Experience Match" value={scoreDefaults.experience} suffix="%" color="#2563eb" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard icon={TrackChanges} label="Keyword Match" value={scoreDefaults.keyword} suffix="%" color="#6d4dfc" />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper id="about" sx={{ mb: 2.5, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(_, nextValue) => setActiveTab(nextValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: { xs: 1, md: 2 },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 99,
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab icon={<AutoAwesome />} iconPosition="start" label="Overview" />
          <Tab icon={<Psychology />} iconPosition="start" label="Skills Analysis" />
          <Tab icon={<BarChart />} iconPosition="start" label="ATS Analysis" />
          <Tab icon={<CompareArrows />} iconPosition="start" label="Detailed Comparison" />
          <Tab icon={<RocketLaunch />} iconPosition="start" label="Recommendations" />
        </Tabs>
        <Divider />

        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          {activeTab === 0 && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 'none' }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 1.5 }}>
                    Strengths & Weaknesses
                  </Typography>
                  <Stack spacing={1.5}>
                    <Checklist title="Strengths" items={strengths} tone="success" />
                    <Checklist title="Areas to Improve" items={improvements} tone="warning" />
                  </Stack>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 4.5 }}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 'none' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography sx={{ color: 'text.primary', fontWeight: 900 }}>
                      Top Matching Skills
                    </Typography>
                    <Button size="small" sx={{ color: 'primary.main', p: 0, minWidth: 'auto' }}>
                      View all skills →
                    </Button>
                  </Stack>
                  {skillRows.map((skill) => (
                    <ProgressRow key={skill.label} label={skill.label} value={skill.value} />
                  ))}
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, md: 3.5 }}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 'none' }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 1 }}>
                    ATS Analysis
                  </Typography>
                  <AtsGauge value={atsScore} />
                  <Box
                    sx={{
                      p: 1.6,
                      mt: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(23, 178, 106, 0.06)',
                      border: '1px solid rgba(23, 178, 106, 0.14)',
                    }}
                  >
                    <Stack spacing={0.8}>
                      {atsNotes.map((note) => (
                        <Stack key={note} direction="row" spacing={1} alignItems="flex-start">
                          <CheckCircle sx={{ color: 'success.main', fontSize: 16, mt: 0.1 }} />
                          <Typography sx={{ color: 'text.primary', fontSize: 12.5, fontWeight: 650 }}>
                            {note}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  <Button fullWidth sx={{ mt: 1.5, bgcolor: 'rgba(109, 77, 252, 0.08)' }}>
                    View ATS Details →
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Paper sx={{ p: 2, boxShadow: 'none' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 2 }}>
                Skills Analysis
              </Typography>
              {skillRows.map((skill) => (
                <ProgressRow key={skill.label} label={skill.label} value={skill.value} />
              ))}
            </Paper>
          )}

          {activeTab === 2 && (
            <Paper sx={{ p: 2, boxShadow: 'none' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 1 }}>
                ATS Analysis
              </Typography>
              <AtsGauge value={atsScore} />
            </Paper>
          )}

          {activeTab === 3 && (
            <Paper sx={{ p: 2, boxShadow: 'none' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 1 }}>
                Detailed Comparison
              </Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                {data.summary || 'Run an analysis to populate detailed resume-to-job comparison results.'}
              </Typography>
            </Paper>
          )}

          {activeTab === 4 && (
            <Paper sx={{ p: 2, boxShadow: 'none' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 900, mb: 1.5 }}>
                Recommendations
              </Typography>
              <Checklist title="Recommended next steps" items={atsNotes} tone="success" />
            </Paper>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CompareResumes;

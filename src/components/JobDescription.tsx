import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Link as LinkIcon,
  Upload as UploadIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { apiEndPoint, API_ENDPOINTS } from './Constant';

const JobDescription: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: true } });

    try {
      const response = await axios.post(apiEndPoint + API_ENDPOINTS.SCRAPE_URL, {
        url: urlInput
      });

      dispatch({
        type: 'SET_JOB_DESCRIPTION',
        payload: { data: response.data.response, source: 'url' }
      });
    } catch (error) {
      setError('Failed to extract job description from URL');
      console.error('Error scraping URL:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: false } });
    }
  };

  const processPdfFile = async (file: File) => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: true } });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        let base64String = reader.result as string;
        base64String = base64String.replace(/^data:application\/pdf;base64,/, "");

        try {
          const response = await axios.post(apiEndPoint + API_ENDPOINTS.EXTRACT_JD, {
            file_name: file.name,
            base64_data: base64String
          });

          dispatch({
            type: 'SET_JOB_DESCRIPTION',
            payload: { data: response.data.response, source: 'pdf' }
          });
        } catch (error) {
          setError('Failed to extract job description from PDF');
          console.error('Error extracting JD:', error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('Error processing PDF file');
      console.error('Error processing file:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: false } });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      processPdfFile(file);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Job Description
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab icon={<LinkIcon />} label="URL" />
          <Tab icon={<UploadIcon />} label="Upload PDF" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <TextField
              fullWidth
              label="Job Description URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/job-posting"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleUrlSubmit}
              startIcon={<SendIcon />}
              disabled={state.loading.extractingJD}
            >
              Extract from URL
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Paper
            {...getRootProps()}
            sx={{
              p: 3,
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop PDF here' : 'Upload Job Description PDF'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click or drag and drop a PDF file
            </Typography>
          </Paper>
        )}

        {state.loading.extractingJD && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            <Typography>Processing job description...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {state.jobDescription && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Job description loaded successfully ({state.jobDescription.source})
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default JobDescription;
import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Link as LinkIcon,
  Upload as UploadIcon,
  Send as SendIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { apiEndPoint, API_ENDPOINTS } from './Constant';

const JobDescription: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: true } });

    try {
      const response = await axios.post(apiEndPoint + API_ENDPOINTS.SCRAPE_URL, {
        url: urlInput
      });

      dispatch({
        type: 'SET_JOB_DESCRIPTION',
        payload: { data: response.data.response, source: 'url' }
      });
    } catch (error) {
      setError('Failed to extract job description from URL');
      console.error('Error scraping URL:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: false } });
    }
  };

  const processPdfFile = async (file: File) => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: true } });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        let base64String = reader.result as string;
        base64String = base64String.replace(/^data:application\/pdf;base64,/, "");

        try {
          const response = await axios.post(apiEndPoint + API_ENDPOINTS.EXTRACT_JD, {
            file_name: file.name,
            base64_data: base64String
          });

          dispatch({
            type: 'SET_JOB_DESCRIPTION',
            payload: { data: response.data.response, source: 'pdf' }
          });
        } catch (error) {
          setError('Failed to extract job description from PDF');
          console.error('Error extracting JD:', error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('Error processing PDF file');
      console.error('Error processing file:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'extractingJD', value: false } });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      processPdfFile(file);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
          Job Description
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add job requirements via URL or upload a PDF document
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab icon={<LinkIcon />} label="From URL" sx={{ textTransform: 'none', fontWeight: 500 }} />
        <Tab icon={<UploadIcon />} label="Upload PDF" sx={{ textTransform: 'none', fontWeight: 500 }} />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <TextField
            fullWidth
            placeholder="Enter job posting URL (e.g., LinkedIn, Indeed, company website)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            sx={{ mb: 2 }}
            disabled={state.loading.extractingJD}
          />
          <Button
            variant="contained"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim() || state.loading.extractingJD}
            startIcon={state.loading.extractingJD ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ fontWeight: 600 }}
          >
            {state.loading.extractingJD ? 'Extracting...' : 'Extract Job Description'}
          </Button>
        </Box>
      )}

      {activeTab === 1 && (
        <Paper
          {...getRootProps()}
          sx={{
            p: 4,
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            bgcolor: isDragActive ? 'primary.50' : 'background.paper',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            borderRadius: 2,
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isDragActive ? 'Drop PDF here' : 'Drop job description PDF here'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to select a PDF file
          </Typography>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {state.jobDescription && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Job Description Loaded
            </Typography>
            <Chip 
              label={state.jobDescription.source === 'url' ? 'From URL' : 'From PDF'} 
              color="success" 
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Box>
          <Paper sx={{ p: 2, bgcolor: 'grey.50', maxHeight: 200, overflow: 'auto' }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {state.jobDescription.data.slice(0, 500)}
              {state.jobDescription.data.length > 500 && '...'}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default JobDescription;
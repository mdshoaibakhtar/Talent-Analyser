
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


import React, { useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as FileIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { apiEndPoint, API_ENDPOINTS, prompt } from './Constant';

const UploadResume: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const processResumeFile = async (file: File) => {
    const fileId = `${Date.now()}-${file.name}`;
    
    // Add resume to state immediately
    const resume = {
      id: fileId,
      file,
      extractedData: '',
      base64Data: '',
    };
    
    dispatch({ type: 'ADD_RESUME', payload: resume });
    dispatch({ type: 'SET_LOADING', payload: { key: 'uploadingResume', value: true } });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        let base64String = reader.result as string;
        base64String = base64String.replace(/^data:application\/pdf;base64,/, "")
          .replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/, "");

        try {
          const response = await axios.post(apiEndPoint + API_ENDPOINTS.UPLOAD_RESUME, {
            file_name: file.name,
            prompt: prompt,
            base64_data: base64String
          });

          dispatch({
            type: 'UPDATE_RESUME_DATA',
            payload: { id: fileId, data: response.data.response }
          });
        } catch (error) {
          console.error('Error uploading resume:', error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'uploadingResume', value: false } });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.name.match(/\.(pdf|docx)$/i)) {
        processResumeFile(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const removeResume = (id: string) => {
    dispatch({
      type: 'ADD_RESUME',
      payload: { 
        id: '', 
        file: new File([], ''), 
        extractedData: '', 
        base64Data: '' 
      }
    });
    // Note: This would need a proper REMOVE_RESUME action in the reducer
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Resumes
      </Typography>
      
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          mb: 2,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop files here' : 'Drag & drop resumes here'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to select files (PDF, DOCX)
        </Typography>
        {state.loading.uploadingResume && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Processing resume...
            </Typography>
          </Box>
        )}
      </Paper>

      {state.resumes.length > 0 && (
        <Paper sx={{ mt: 2 }}>
          <List>
            {state.resumes.map((resume) => (
              <ListItem
                key={resume.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeResume(resume.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  {resume.extractedData ? (
                    <CheckIcon color="success" />
                  ) : (
                    <FileIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={resume.file.name}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        size="small"
                        label={resume.extractedData ? 'Processed' : 'Processing...'}
                        color={resume.extractedData ? 'success' : 'default'}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default UploadResume;

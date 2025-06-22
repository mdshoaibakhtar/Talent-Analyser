import { useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../context/AppContext";
// import axios from "axios";
// import { apiEndPoint, API_ENDPOINTS, prompt } from "./Constant";

interface resumeObject{
  file_name: string;
  base64: string;
}

interface Resume {
  setUploadedResume: (params: resumeObject) => void;
  uploadedResume: resumeObject
}

const UploadResume: React.FC<Resume> = ({ setUploadedResume, uploadedResume }) => {
  const { state, dispatch } = useAppContext();

  const processResumeFile = async (file: File) => {

    // dispatch({ type: "ADD_RESUME", payload: resume });
    dispatch({
      type: "SET_LOADING",
      payload: { key: "uploadingResume", value: true },
    });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        let base64String = reader.result as string;
        base64String = base64String
          .replace(/^data:application\/pdf;base64,/, "")

        try {
          setUploadedResume({ 'file_name': file.name, 'base64': base64String });
          // const response = await axios.post(
          //   apiEndPoint + API_ENDPOINTS.UPLOAD_RESUME,
          //   {
          //     file_name: file.name,
          //     prompt: prompt,
          //     base64_data: base64String,
          //   },
          // );

          // dispatch({
          //   type: "UPDATE_RESUME_DATA",
          //   payload: { id: fileId, data: response.data.response },
          // });
        } catch (error) {
          console.error("Error uploading resume:", error);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "uploadingResume", value: false },
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let files = acceptedFiles[0];
    if (files && files.type === "application/pdf" ||
      files.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      files.name.match(/\.(pdf|docx)$/i)
    ) {
      processResumeFile(files);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, color: "text.primary" }}>
          Upload Resumes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload candidate resumes in PDF or DOCX format for analysis
        </Typography>
      </Box>

      <Paper
        {...getRootProps()}
        sx={{
          p: 6,
          mb: 3,
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "divider",
          bgcolor: isDragActive ? "primary.50" : "background.paper",
          cursor: "pointer",
          textAlign: "center",
          transition: "all 0.3s ease",
          borderRadius: 3,
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "action.hover",
            transform: "translateY(-2px)",
            boxShadow:
              "0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: "50%",
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <UploadIcon sx={{ fontSize: 40, color: "white" }} />
        </Box>

        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {isDragActive ? "Drop files here" : "Drag & drop resumes here"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          or click to select files • PDF, DOCX supported
        </Typography>

        {state.loading.uploadingResume && (
          <Box sx={{ mt: 3 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Processing resume...
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper sx={{ overflow: "hidden" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {uploadedResume.file_name || "Uploaded Resume"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UploadResume;

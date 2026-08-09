import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  CloudUpload,
  Link as LinkIcon,
  PictureAsPdf,
  Send as SendIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { apiEndPoint, API_ENDPOINTS } from "./Constant";

interface JobDescription {
  uploadedJobDescription: { file_name: string; base64: string };
  setUploadedJobDescription: (params: { file_name: string; base64: string }) => void;
}

const JobDescription: React.FC<JobDescription> = ({
  uploadedJobDescription,
  setUploadedJobDescription,
}) => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");

  const isUrlLoaded = state.jobDescription?.source === "url";
  const hasJobDescription = Boolean(uploadedJobDescription.file_name || isUrlLoaded);

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    dispatch({
      type: "SET_LOADING",
      payload: { key: "extractingJD", value: true },
    });

    try {
      const response = await axios.post(
        apiEndPoint + API_ENDPOINTS.SCRAPE_URL,
        { url: urlInput },
      );
      dispatch({
        type: "SET_JOB_DESCRIPTION",
        payload: { data: response.data.extracted_text, source: "url" },
      });
    } catch (error) {
      setError("Failed to extract job description from URL");
      console.error("Error scraping URL:", error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "extractingJD", value: false },
      });
    }
  };

  const processJobDescriptionFile = useCallback((file: File) => {
    dispatch({
      type: "SET_LOADING",
      payload: { key: "extractingJD", value: true },
    });

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = String(reader.result ?? "").replace(
        /^data:application\/pdf;base64,/,
        "",
      );

      setUploadedJobDescription({ file_name: file.name, base64: base64String });
      dispatch({
        type: "SET_JOB_DESCRIPTION",
        payload: { data: base64String, source: "pdf" },
      });
    };

    reader.onerror = () => {
      console.error("Error processing job description file:", reader.error);
    };

    reader.onloadend = () => {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "extractingJD", value: false },
      });
    };

    reader.readAsDataURL(file);
  }, [dispatch, setUploadedJobDescription]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const isPdf = Boolean(file && (file.type === "application/pdf" || file.name.match(/\.pdf$/i)));

    if (file && isPdf) {
      processJobDescriptionFile(file);
    }
  }, [processJobDescriptionFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2.2 }}>
        <Typography variant="h4" sx={{ mb: 0.7 }}>
          Upload Job Description
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Upload job description in PDF format or paste URL
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          border: "1px solid rgba(109, 77, 252, 0.18)",
          borderRadius: 1,
          overflow: "hidden",
          mb: 2,
          bgcolor: "#f7f8fc",
        }}
      >
        <Button
          startIcon={<UploadIcon />}
          onClick={() => setActiveTab("upload")}
          sx={{
            borderRadius: 1,
            color: activeTab === "upload" ? "primary.main" : "text.primary",
            bgcolor: activeTab === "upload" ? "white" : "#f4f6fb",
            border: activeTab === "upload" ? "1px solid" : "1px solid transparent",
            borderColor: activeTab === "upload" ? "primary.light" : "transparent",
            boxShadow: activeTab === "upload" ? "0 0 0 1px rgba(109, 77, 252, 0.08)" : "none",
            "&:hover": { bgcolor: activeTab === "upload" ? "white" : "#eef2fb" },
          }}
        >
          Upload File
        </Button>
        <Button
          startIcon={<LinkIcon />}
          onClick={() => setActiveTab("url")}
          sx={{
            borderRadius: 1,
            color: activeTab === "url" ? "primary.main" : "text.primary",
            bgcolor: activeTab === "url" ? "white" : "#f4f6fb",
            border: activeTab === "url" ? "1px solid" : "1px solid transparent",
            borderColor: activeTab === "url" ? "primary.light" : "transparent",
            boxShadow: activeTab === "url" ? "0 0 0 1px rgba(109, 77, 252, 0.08)" : "none",
            "&:hover": { bgcolor: activeTab === "url" ? "white" : "#eef2fb" },
          }}
        >
          From URL
        </Button>
      </Box>

      {activeTab === "upload" ? (
        <Paper
          {...getRootProps()}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 2,
            minHeight: 136,
            border: "2px dashed",
            borderColor: isDragActive ? "primary.main" : "rgba(109, 77, 252, 0.48)",
            background: isDragActive ? "rgba(109, 77, 252, 0.07)" : "linear-gradient(180deg, #fff 0%, #fbf9ff 100%)",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s ease",
            boxShadow: "none",
            "&:hover": {
              borderColor: "primary.main",
              background: "rgba(109, 77, 252, 0.05)",
            },
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              width: 58,
              height: 58,
              mx: "auto",
              mb: 1.5,
              borderRadius: "50%",
              border: "3px solid rgba(109, 77, 252, 0.22)",
              display: "grid",
              placeItems: "center",
              color: "primary.main",
              bgcolor: "white",
            }}
          >
            <CloudUpload sx={{ fontSize: 31 }} />
          </Box>

          <Typography sx={{ color: "text.primary", fontWeight: 800, mb: 0.4 }}>
            {isDragActive ? "Drop job description here" : "Drag & drop job description here"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            PDF format only (Max 10MB)
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: { xs: 2.2, md: 2.5 },
            mb: 2,
            minHeight: 136,
            boxShadow: "none",
            background: "linear-gradient(180deg, #fff 0%, #fbf9ff 100%)",
          }}
        >
          <TextField
            fullWidth
            label="Job Description URL"
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
            placeholder="https://example.com/job-posting"
            size="small"
            sx={{ mb: 1.5 }}
          />
          <Button
            variant="contained"
            onClick={handleUrlSubmit}
            startIcon={state.loading.extractingJD ? <CircularProgress size={17} color="inherit" /> : <SendIcon />}
            disabled={state.loading.extractingJD}
            fullWidth
          >
            {state.loading.extractingJD ? "Extracting..." : "Extract from URL"}
          </Button>
        </Paper>
      )}

      <Paper
        sx={{
          p: 1.6,
          boxShadow: "none",
          borderColor: hasJobDescription ? "rgba(23, 178, 106, 0.22)" : "rgba(109, 77, 252, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 34,
              height: 40,
              borderRadius: 1,
              border: "2px solid #ff3b3b",
              color: "#ff3b3b",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <PictureAsPdf sx={{ fontSize: 22 }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: "text.primary", fontWeight: 800, fontSize: 14 }} noWrap>
              {uploadedJobDescription.file_name || (isUrlLoaded ? "Job description URL" : "No job description uploaded yet")}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13, fontWeight: 600 }}>
              {hasJobDescription ? (isUrlLoaded ? "URL extracted" : "PDF uploaded") : "Waiting for job description"}
            </Typography>
          </Box>
        </Stack>
        <CheckCircle sx={{ color: hasJobDescription ? "success.main" : "grey.300", fontSize: 24, flexShrink: 0 }} />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default JobDescription;

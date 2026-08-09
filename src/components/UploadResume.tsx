import { useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  CloudUpload,
  Link as LinkIcon,
  PictureAsPdf,
  Upload as UploadIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../context/AppContext";

interface ResumeObject {
  file_name: string;
  base64: string;
}

interface Resume {
  setUploadedResume: (params: ResumeObject) => void;
  uploadedResume: ResumeObject;
}

const UploadResume: React.FC<Resume> = ({ setUploadedResume, uploadedResume }) => {
  const { state, dispatch } = useAppContext();
  const hasFile = Boolean(uploadedResume.file_name);

  const processResumeFile = useCallback((file: File) => {
    dispatch({
      type: "SET_LOADING",
      payload: { key: "uploadingResume", value: true },
    });

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = String(reader.result ?? "").replace(
        /^data:application\/pdf;base64,/,
        "",
      );

      setUploadedResume({ file_name: file.name, base64: base64String });
      dispatch({
        type: "ADD_RESUME",
        payload: {
          id: `${file.name}-${file.lastModified}`,
          file,
          extractedData: "",
          base64Data: base64String,
        },
      });
    };

    reader.onerror = () => {
      console.error("Error processing resume file:", reader.error);
    };

    reader.onloadend = () => {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "uploadingResume", value: false },
      });
    };

    reader.readAsDataURL(file);
  }, [dispatch, setUploadedResume]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const isPdf = Boolean(file && (file.type === "application/pdf" || file.name.match(/\.pdf$/i)));

    if (file && isPdf) {
      processResumeFile(file);
    }
  }, [processResumeFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <Box>
      <Box sx={{ mb: 2.2 }}>
        <Typography variant="h4" sx={{ mb: 0.7 }}>
          Upload Resume
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Upload your resume in PDF format or paste URL
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
          sx={{
            borderRadius: 1,
            color: "primary.main",
            bgcolor: "white",
            border: "1px solid",
            borderColor: "primary.light",
            boxShadow: "0 0 0 1px rgba(109, 77, 252, 0.08)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          Upload File
        </Button>
        <Button
          startIcon={<LinkIcon />}
          sx={{
            borderRadius: 0,
            color: "text.primary",
            bgcolor: "#f4f6fb",
            "&:hover": { bgcolor: "#eef2fb", boxShadow: "none" },
          }}
        >
          From URL
        </Button>
      </Box>

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
          {isDragActive ? "Drop your resume here" : "Drag & drop your resume here"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          PDF format only (Max 10MB)
        </Typography>

        {state.loading.uploadingResume && (
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 2 }}>
            <CircularProgress size={18} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Processing resume...
            </Typography>
          </Stack>
        )}
      </Paper>

      <Paper
        sx={{
          p: 1.6,
          boxShadow: "none",
          borderColor: hasFile ? "rgba(23, 178, 106, 0.22)" : "rgba(109, 77, 252, 0.12)",
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
              {uploadedResume.file_name || "No resume uploaded yet"}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13, fontWeight: 600 }}>
              {hasFile ? "PDF uploaded" : "Waiting for PDF"}
            </Typography>
          </Box>
        </Stack>
        <CheckCircle sx={{ color: hasFile ? "success.main" : "grey.300", fontSize: 24, flexShrink: 0 }} />
      </Paper>
    </Box>
  );
};

export default UploadResume;

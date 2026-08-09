import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"© "}
          {new Date().getFullYear()}
          {" Talent Analyser. Built with "}
          <Link color="inherit" href="https://mui.com/">
            React
          </Link>
          {" and AI-powered matching."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

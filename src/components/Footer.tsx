import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "grey.100",
        borderTop: 1,
        borderColor: "grey.300",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"© "}
          {new Date().getFullYear()}
          {" Talent Analyser. Built with "}
          <Link color="inherit" href="https://mui.com/">
            Material-UI
          </Link>
          {" and "}
          <Link color="inherit" href="https://reactjs.org/">
            React
          </Link>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

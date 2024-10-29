import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          VaultConnect is a secure and personalized dashboard designed to centralize and manage your digital footprint. Our mission is to provide a secure, user-friendly platform that helps you keep track of your digital life.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team is dedicated to ensuring the highest standards of security and privacy. With VaultConnect, you can integrate your digital accounts, manage documents, create task lists, and much more, all from a single dashboard.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing VaultConnect. We are committed to helping you stay organized and secure in the digital age.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;

import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Features = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Features
        </Typography>
        <Typography variant="body1" paragraph>
          VaultConnect offers a wide range of features to help you manage your digital life:
        </Typography>
        <Typography variant="body1" paragraph>
          - **Basic Dashboard:** Access your credentials and documents quickly and easily.
        </Typography>
        <Typography variant="body1" paragraph>
          - **User Authentication:** Secure login and registration with bcrypt for hashing.
        </Typography>
      </Box>
    </Container>
  );
};

export default Features;

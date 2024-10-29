import React from 'react';
import { Typography, Box, Container, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We'd love to hear from you! If you have any questions, feedback, or need support, please reach out to us using the form below.
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;

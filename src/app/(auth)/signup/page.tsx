
import { Container, Typography, Box } from '@mui/material';
import SignUpForm from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
}

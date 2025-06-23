
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
       <LoginForm/>
      </Box>
    </Container>
  );
}

// components/auth/SignUpForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/lib/schema/signup-schema';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import api from '@/lib/api';

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await api.post('/auth/signup', data);
      toast.success('Signup successful! Check your email for OTP.');
      router.push('/login');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Signup failed';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}

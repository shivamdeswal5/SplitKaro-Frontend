'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '@/lib/schema/login-schema';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any, 
    defaultValues: {
      email: '',
      password: '',
      otp: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await api.post('/auth/login', data);
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
      <TextField
        label="OTP (optional)"
        fullWidth
        margin="normal"
        {...register('otp')}
        error={!!errors.otp}
        helperText={errors.otp?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
}

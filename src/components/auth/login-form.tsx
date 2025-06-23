'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '@/lib/schema/login-schema';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import api from '@/lib/api';
import { login } from '@/store/slices/auth-slice';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any, 
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data);
      console.log("Response in login: ",response.data.user);
      dispatch(login(response.data.user));
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed';
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} >
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

import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  otp: yup.string().optional(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

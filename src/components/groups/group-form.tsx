'use client';

import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import api from '@/lib/api';
import {useSelector } from 'react-redux';
import { RootState } from '@/store';


interface GroupFormProps {
  onSuccess: () => void;
}

export default function GroupForm({ onSuccess }: GroupFormProps) {
  const userId = useSelector((state: RootState) => state.auth.user?.id) as string;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string }>();

  const onSubmit = async (data: { name: string }) => {
    try {
      const res = await api.post('/groups/create-group', { name: data.name, createdBy: userId });
      console.log("Response in group table: ",res);
      toast.success('Group created successfully');
      reset();
      onSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Group creation failed';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={1}>
      <TextField
        label="Group Name"
        variant="filled"
        fullWidth
        margin="normal"
        {...register('name', { required: 'Group name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Group'}
      </Button>
    </Box>
  );
}

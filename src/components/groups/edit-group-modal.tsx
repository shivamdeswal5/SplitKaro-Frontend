'use client';

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Autocomplete,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Group, User } from '@/lib/types/GroupType';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',        
  overflowY: 'auto',        
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface EditGroupModalProps {
  open: boolean;
  onClose: () => void;
  group: Group;
}

interface FormValues {
  name: string;
  addUsersIds: string[];
  removeUsersIds: string[];
}

export default function EditGroupModal({ open, onClose, group }: EditGroupModalProps) {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: group.name,
      addUsersIds: [],
      removeUsersIds: [],
    },
  });

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users'); 
        setAllUsers(res.data);
      } catch (err) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchUsers();
  }, [open]);

  const onSubmit = async (data: FormValues) => {
    try {
      await api.patch(`/groups/${group.id}`, data);
      toast.success('Group updated successfully');
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Group update failed';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <Modal open={open} onClose={onClose} >
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Edit Group
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Group Name"
                    variant="filled"
                    fullWidth
                  />
                )}
              />

              <Controller
                name="addUsersIds"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={allUsers}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(_, value) => field.onChange(value.map((user) => user.id))}
                    renderInput={(params) => <TextField {...params} label="Add Users" />}
                  />
                )}
              />

              <Controller
                name="removeUsersIds"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={allUsers}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(_, value) => field.onChange(value.map((user) => user.id))}
                    renderInput={(params) => <TextField {...params} label="Remove Users" />}
                  />
                )}
              />

              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </Modal>
  );
}

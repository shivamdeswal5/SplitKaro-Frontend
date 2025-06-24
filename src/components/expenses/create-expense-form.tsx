'use client';

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useForm, Controller } from 'react-hook-form';
import { createExpense } from '@/store/expense/expense-api';
import { CreateExpensePayload } from '@/lib/types/ExpenseType';
import { Group } from '@/lib/types/GroupType';

interface Props {
  group: Group;
  onSuccess?: () => void;
}

export default function CreateExpenseForm({ group, onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<Partial<CreateExpensePayload>>({
    defaultValues: {
      name: '',
      description: '',
      amount: undefined,
      reciptUrl: '',
      categoryId: '',
      participantIds: [],
    },
  });

  const participants = group.members.map((m) => ({
    id: m.user.id,
    name: `${m.user.firstName} ${m.user.lastName}`,
  }));

  const categories = group.categories || []; 

  const onSubmit = async (data: Partial<CreateExpensePayload>) => {
    if (!data.name || !data.amount || !data.categoryId || !data.participantIds?.length) {
      setError('participantIds', { message: 'Select at least one participant' });
      return;
    }

    const payload: CreateExpensePayload = {
      name: data.name,
      description: data.description || '',
      amount: Number(data.amount),
      reciptUrl: data.reciptUrl,
      groupId: group.id,
      createdById: group.createdBy.id,
      categoryId: data.categoryId,
      participantIds: data.participantIds,
    };

    const result = await dispatch(createExpense(payload));
    if (createExpense.fulfilled.match(result)) {
      if (onSuccess) onSuccess();
      reset(); 
    } else {
      setError('name', { message: result.payload || 'Failed to create expense' });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Create New Expense</Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Expense name is required' }}
          render={({ field }) => (
            <TextField
              label="Expense Name"
              fullWidth
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              fullWidth
              multiline
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          rules={{ required: 'Amount is required' }}
          render={({ field }) => (
            <TextField
              label="Amount"
              type="number"
              fullWidth
              required
              margin="normal"
              error={!!errors.amount}
              helperText={errors.amount?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="reciptUrl"
          control={control}
          render={({ field }) => (
            <TextField
              label="Receipt URL (optional)"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <TextField
              label="Category"
              select
              fullWidth
              required
              margin="normal"
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
              {...(field as import('@mui/material').TextFieldProps)}
            >
              {categories.map((cat: { id: string; name: string }) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Typography sx={{ mt: 2 }}>Select Participants:</Typography>

        <Controller
          name="participantIds"
          control={control}
          rules={{ required: 'Select at least one participant' }}
          render={({ field }) => (
            <FormGroup>
              {participants.map((p) => (
                <FormControlLabel
                  key={p.id}
                  control={
                    <Checkbox
                      checked={field.value?.includes(p.id) || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        field.onChange(
                          checked
                            ? [...(field.value || []), p.id]
                            : field.value?.filter((id) => id !== p.id)
                        );
                      }}
                    />
                  }
                  label={p.name}
                />
              ))}
              {errors.participantIds && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.participantIds.message}
                </Typography>
              )}
            </FormGroup>
          )}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Create Expense
        </Button>
      </form>
    </Box>
  );
}
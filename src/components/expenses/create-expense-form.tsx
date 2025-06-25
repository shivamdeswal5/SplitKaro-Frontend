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
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createExpense, updateExpense } from '@/store/expense/expense-api';
import { CreateExpensePayload, Expense } from '@/lib/types/ExpenseType';
import { Group } from '@/lib/types/GroupType';
import { Category } from '@/lib/types/CategoryType';
import api from '@/lib/api';

interface Props {
  group: Group;
  onSuccess?: () => void;
  expense?: Expense;
}

export default function CreateExpenseForm({ group, onSuccess, expense }: Props) {
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id) as string;
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const participants = group.members.map((m) => ({
    id: m.user.id,
    name: `${m.user.firstName} ${m.user.lastName}`,
  }));

  console.log("Expense Receiced in create expense form: ",expense);

  const {
    control,
    handleSubmit,
    setError,
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

  useEffect(() => {
    if (expense) {
      reset({
        name: expense.name,
        description: expense.description || '',
        amount: expense.amount,
        reciptUrl: expense.reciptUrl || '',
        categoryId: expense.category?.id || '',
        participantIds:
          Array.isArray(expense.members) && expense.members.length > 0
            ? expense.members
                .map((m) => m.user?.id)
                .filter((id): id is string => !!id)
            : [],
      });
    }
  }, [expense, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch {
        setFetchError('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: Partial<CreateExpensePayload>) => {
    if (!data.name || !data.amount || !data.categoryId || !data.participantIds?.length) {
      setError('participantIds', {
        message: 'Please fill all required fields',
      });
      return;
    }

    const updatedData = {
      name : data.name,
      description: data.description,
      amount:Number(data.amount),
      reciptUrl: data.reciptUrl,
      categoryId: data.categoryId,
      participantIds: data.participantIds,

    }

    const payload: CreateExpensePayload = {
      name: data.name,
      description: data.description || '',
      amount: Number(data.amount),
      reciptUrl: data.reciptUrl,
      groupId: group.id,
      createdById: currentUserId,
      categoryId: data.categoryId,
      participantIds: data.participantIds,
    };


    const result = expense
      ? await dispatch(updateExpense({ expenseId: expense.id, data: updatedData }))
      : await dispatch(createExpense(payload));

    if (
      (!expense && createExpense.fulfilled.match(result)) ||
      (expense && updateExpense.fulfilled.match(result))
    ) {
      onSuccess?.();
      reset();
    } else {
      setError('name', {
        message: result.payload || 'Failed to save expense',
      });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {expense ? 'Edit Expense' : 'Create New Expense'}
      </Typography>

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

        {loadingCategories ? (
          <CircularProgress size={24} sx={{ mt: 3 }} />
        ) : fetchError ? (
          <Typography color="error">{fetchError}</Typography>
        ) : (
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
                {...(field as any)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}

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
                        const updated = checked
                          ? [...(field.value || []), p.id]
                          : field.value?.filter((id) => id !== p.id);
                        field.onChange(updated);
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
          {expense ? 'Update Expense' : 'Create Expense'}
        </Button>
      </form>
    </Box>
  );
}



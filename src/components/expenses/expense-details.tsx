"use client";

import { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchExpenseById } from "@/store/expense/expense-api";

interface Props {
  expenseId: string;
}

export default function ExpenseDetails({ expenseId }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const expense = useSelector(
    (state: RootState) => state.expense.byId[expenseId]
  );
  const loading = useSelector(
    (state: RootState) => state.expense.loading[expenseId]
  );
  const error = useSelector(
    (state: RootState) => state.expense.error[expenseId]
  );

  useEffect(() => {
    if (!expense) {
      dispatch(fetchExpenseById(expenseId));
    }
  }, [expenseId, dispatch, expense]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!expense) return <Typography>No expense data found.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {expense.name}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Description: {expense.description || ""}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Total Amount: ₹{expense.amount}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Created By: {expense.createdBy.firstName} {expense.createdBy.lastName}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Group: {expense.group.name}
      </Typography>

      {expense.category && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Category: {expense.category.name}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Split Between:
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        {expense.members.map((member) => (
          <Box key={member.id} sx={{ mb: 1 }}>
            <Typography>
              {member.user.firstName} {member.user.lastName}: ₹{member.amount}
            </Typography>
          </Box>
        ))}
      </Paper>
      {expense.reciptUrl && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Receipt:
          </Typography>
          <a
            href={expense.reciptUrl}
          >
            {expense.reciptUrl}
          </a>
        </Box>
      )}
    </Box>
  );
}

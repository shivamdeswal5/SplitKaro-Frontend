
'use client';

import { Group } from '@/lib/types/GroupType';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CreateExpenseForm from './create-expense-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteExpense } from '@/store/expense/expense-api';
import { fetchGroupById } from '@/store/groups/group-api';

interface Props {
  group: Group;
}

export default function ExpensesList({ group }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleEdit = (expenseId: string) => setEditingExpenseId(expenseId);
  const handleDeleteClick = (expenseId: string) => setConfirmDeleteId(expenseId);
  const handleCloseEdit = () => setEditingExpenseId(null);
  const handleCloseDelete = () => setConfirmDeleteId(null);

  const selectedExpense = editingExpenseId
    ? group.expenses.find((e) => e.id === editingExpenseId)
    : null;

  const handleDeleteConfirmed = async () => {
    if (confirmDeleteId) {
      await dispatch(deleteExpense(confirmDeleteId));
      await dispatch(fetchGroupById(group.id));
      handleCloseDelete();
    }
  };

  const handleUpdateSuccess = () => {
    dispatch(fetchGroupById(group.id));
    handleCloseEdit();
  };

  return (
    <>
      {group.expenses.length === 0 ? (
        <Typography>No expenses found</Typography>
      ) : (
        <List>
          {group.expenses.map((expense) => (
            <ListItem
              key={expense.id}
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(expense.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={expense.name}
                secondary={`₹${expense.amount} : ${expense.createdBy?.firstName} ${expense.createdBy?.lastName}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={!!editingExpenseId} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit Expense
          <IconButton onClick={handleCloseEdit} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedExpense ? (
            <CreateExpenseForm
              group={group}
              expense={{ ...selectedExpense, groupId: group.id }}
              onSuccess={handleUpdateSuccess}
            />
          ) : (
            <Typography color="error">Unable to load expense details.</Typography>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmDeleteId} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this expense?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
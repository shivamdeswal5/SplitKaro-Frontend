'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchGroupBalances } from '@/store/settlements/settlement-api';
import { Typography, CircularProgress, Paper, Box } from '@mui/material';

interface Props {
  groupId: string;
  members: { id: string; firstName: string; lastName: string }[];
}

export default function GroupBalances({ groupId, members }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { balances, loading, error } = useSelector(
    (state: RootState) => state.settlements
  );

  useEffect(() => {
    dispatch(fetchGroupBalances(groupId));
  }, [dispatch, groupId]);

  const getName = (userId: string) => {
    const member = members.find(m => m.id === userId);
    return member ? `${member.firstName} ${member.lastName}` : 'Unknown';
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Group Balances
      </Typography>
      {Object.entries(balances).length === 0 ? (
        <Typography>No balances found.</Typography>
      ) : (
        Object.entries(balances).map(([userId, amount]) => (
          <Box key={userId} sx={{ mb: 1 }}>
            <Typography color={amount < 0 ? 'error' : 'green'}>
              {getName(userId)} {amount < 0 ? 'owes' : 'is owed'} ₹
              {Math.abs(amount).toFixed(2)}
            </Typography>
          </Box>
        ))
      )}
    </Paper>
  );
}
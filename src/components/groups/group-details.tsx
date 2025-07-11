"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchGroupById } from "@/store/groups/group-api";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateExpenseForm from "@/components/expenses/create-expense-form";
import ExpensesList from "@/components/expenses/expenses-list";
import GroupBalances from "./group-balance";

export default function GroupDetailsPage() {
  const { id: groupId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentGroup: group,
    loading,
    error,
  } = useSelector((state: RootState) => state.groups);

  console.log("Current Group In Group Details: ", group);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupById(groupId as string));
    }
  }, [dispatch, groupId]);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleExpenseCreated = () => {
    handleDialogClose();
    if (groupId) {
      dispatch(fetchGroupById(groupId as string));
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!group) return <Typography>No group data</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{group.name}</Typography>
      <Typography variant="subtitle1">
        Created by: {group.createdBy?.firstName} {group.createdBy?.lastName}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Members</Typography>
      <List dense>
        {group.members.map((member) => (
          <ListItem key={member.user.id}>
            <ListItemText
              primary={`${member.user.firstName} ${member.user.lastName}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Expenses</Typography>
      <ExpensesList group={group} />

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleDialogOpen}>
          Create Expense
        </Button>
      </Box>

      <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Create Expense
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateExpenseForm group={group} onSuccess={handleExpenseCreated} />
        </DialogContent>
      </Dialog>

      <GroupBalances
        groupId={group.id}
        members={group.members.map((m) => m.user)}
      />
    </Box>
  );
}

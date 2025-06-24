'use client';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Group } from '@/lib/types/GroupType';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteGroup } from '@/store/groups/group-api';
import EditGroupModal from './edit-group-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function GroupRowActions({ group }: { group: Group }) {
  const dispatch = useDispatch<AppDispatch>();
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this group?')) {
      try {
        await dispatch(deleteGroup(group.id));
        toast.success('Group deleted');
      } catch (err: any) {
        toast.error(err || 'Failed to delete');
      }
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpenEdit(true)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <EditGroupModal open={openEdit} onClose={() => setOpenEdit(false)} group={group} />
    </>
  );
}

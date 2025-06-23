"use client";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GroupRowActions({ group }: { group: any }) {
  const handleEdit = () => {
    console.log("Edit group", group.id);
  };

  const handleDelete = () => {
    console.log("Delete group", group.id);
  };

  return (
    <>
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

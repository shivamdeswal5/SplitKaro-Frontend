"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchGroups } from "@/store/groups/group-api";
import { useDispatch, useSelector} from "react-redux";
import { RootState, AppDispatch } from "@/store";
import GroupRowActions from "./group-row-action";

export default function GroupTable() {
  const userId = useSelector((state: RootState) => state.auth.user?.id) as string;
  console.log("Current userId in Group ..",userId)
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, total } = useSelector((state: RootState) => state.groups);
  console.log("Data of group: ",data);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(fetchGroups({ userId, page: page + 1, limit: rowsPerPage }));
  }, [dispatch, userId, page]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {loading ? (
        <CircularProgress sx={{ m: 4 }} />
      ) : (
        <>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((group: any) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      {new Date(group.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <GroupRowActions group={group} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </>
      )}
    </Paper>
  );
}

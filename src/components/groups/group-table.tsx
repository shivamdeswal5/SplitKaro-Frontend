'use client';

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
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchGroups } from '@/store/groups/group-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import GroupRowActions from './group-row-action';
import { useRouter } from 'next/navigation';

export default function GroupTable() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { data: groups, loading, total } = useSelector((state: RootState) => state.groups);
  const userId = useSelector((state: RootState) => state.auth.user?.id) as string;

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    if (userId) {
      dispatch(fetchGroups({ userId, page: page + 1, limit: rowsPerPage }));
    }
  }, [dispatch, userId, page]);

  const handleRowClick = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {loading ? (
        <CircularProgress sx={{ m: 4 }} />
      ) : groups.length === 0 ? (
        <Typography variant="body1" sx={{ p: 2 }}>
          No groups found.
        </Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sn.</TableCell>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group, index) => (
                  <TableRow
                    key={group.id}
                    hover
                    onClick={() => handleRowClick(group.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>
                      {group.createdBy?.firstName} {group.createdBy?.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(group.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
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
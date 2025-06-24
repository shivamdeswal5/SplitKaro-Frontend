
import { Box } from '@mui/material';
import CreateGroupModal from '@/components/groups/create-group-modal';
import GroupTable from '@/components/groups/group-table';

export default function DashboardPage() {
  return (
    <Box p={2}>
      <CreateGroupModal />
      <Box mt={4}>
        <GroupTable />
      </Box>
    </Box>
  );
}
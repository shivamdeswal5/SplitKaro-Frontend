'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '@/lib/api'; 
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/auth-slice';

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); 
      dispatch(logout());
      toast.success('Logged out successfully');
      router.push('/login'); 
    } catch (err) {
      console.log("Error are: ",err);
      toast.error('Logout failed');
    }
  };

  return (
    <Button color="error" variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
}

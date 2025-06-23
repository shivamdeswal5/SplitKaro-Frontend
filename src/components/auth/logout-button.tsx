'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '@/lib/api'; 

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); 
      toast.success('Logged out successfully');
      router.push('/login'); 
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <Button color="error" variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
}

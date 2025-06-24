'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import LogoutButton from '@/components/auth/logout-button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '@/store';
import {
  fetchNotifications,
  markNotificationAsRead,
} from '@/store/notification/notification-api';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const currentUserId = useSelector(
    (state: RootState) => state.auth.user?.id
  );
  const notifications = useSelector(
    (state: RootState) => state.notification.items
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchNotifications(currentUserId));
    }
  }, [currentUserId, dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkRead = (id: string) => {
    dispatch(markNotificationAsRead(id));
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ color: 'white', textDecoration: 'none' }}
        >
          SplitKaro
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated && currentUserId && (
            <>
              <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {notifications.length === 0 && (
                  <MenuItem disabled>No notifications</MenuItem>
                )}
                {notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    onClick={() => handleMarkRead(notification.id)}
                    sx={{
                      opacity: notification.isRead ? 0.5 : 1,
                      fontWeight: notification.isRead ? 'normal' : 'bold',
                    }}
                  >
                    {notification.message}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
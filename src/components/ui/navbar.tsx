"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import { useSelector } from "react-redux";
interface AuthState {
  isAuthenticated: boolean;
}

interface StateWithAuth {
  auth: AuthState;
}

export default function Navbar() {
    const isAuthenticated = useSelector((state: StateWithAuth) => state.auth.isAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ color: "white", textDecoration: "none" }}
        >
          SplitKaro
        </Typography>

        <Box>
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


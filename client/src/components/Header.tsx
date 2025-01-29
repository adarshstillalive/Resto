import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import { DarkMode, LightMode, Restaurant } from "@mui/icons-material";
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: darkMode ? "#212121" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "0.5rem",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Restaurant />
          <Typography variant="h5" fontSize={36} fontWeight="bold">
            Resto
          </Typography>
        </Box>

        <IconButton
          onClick={toggleDarkMode}
          sx={{
            backgroundColor: darkMode ? "#424242" : "#f5f5f5",

            transition: "0.3s",
            "&:hover": {
              backgroundColor: darkMode ? "#616161" : "#e0e0e0",
            },
          }}
        >
          {darkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

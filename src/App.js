import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";

import Routes from "./src/routes";

export default function App() {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className=""
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Routes />
    </Box>
  );
}

const styles = {
  rowFilter: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};

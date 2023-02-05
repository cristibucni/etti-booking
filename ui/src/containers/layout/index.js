import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Menu, Mail } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { routes } from "../../routes";

export const Layout = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <div>
      <AppBar position="static" sx={{ height: "60px", marginBottom: "20px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ETTI Booking
          </Typography>
          <Button color="inherit">Hello, {user.user.name}</Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Drawer
          anchor={"left"}
          open={isOpen}
          onClose={toggleDrawer("left", false)}
          sx={{ width: "300px" }}
        >
          {routes.map((route) => (
            <ListItem key={route.name} disablePadding>
              <ListItemButton
                onClick={() => {
                  setIsOpen(false);
                  navigate(route.path);
                }}
              >
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </Drawer>
        <Paper
          sx={{ height: "calc(100vh - 100px)", width: "90%", margin: "auto" }}
          elevation={2}
        >
          {props.children}
        </Paper>
      </div>
    </div>
  );
};

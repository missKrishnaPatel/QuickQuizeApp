import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Quick Quiz App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

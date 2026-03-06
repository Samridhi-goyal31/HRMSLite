import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HRMS
        </Typography>
        <Button color="inherit" component={RouterLink} to="/employees">
          Employees
        </Button>
        <Button color="inherit" component={RouterLink} to="/attendance">
          Attendance
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
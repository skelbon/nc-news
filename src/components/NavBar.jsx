import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const [location, setLocation] = useState(useLocation())

  useEffect (()=>{

  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NC-News
          </Typography>
          <Button 
            color="inherit"
            onClick={()=>{
              navigate("/Login")
              console.log(location)
            }}
          >
            { location.pathname==='/Login' ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
import {useEffect, useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './contexts';


export default function NewsAppBar({setDrawerOpen}) {
  const navigate = useNavigate()
  const [location, setLocation] = useState(useLocation())
  const {user, setUser} = useContext(UserContext)

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
            onClick={(e)=>setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NC-News
          </Typography>
          <Button 
            color="inherit"
            onClick={()=>{
              if (!user)
                navigate("/Login")
              else
                setUser(null)
            }}
          >
            { user ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
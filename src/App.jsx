import { useState, useMemo } from 'react'
import './App.css'
import {Box, CssBaseline, Toolbar} from "@mui/material";
import ButtonAppBar from './components/NavBar'
import {Route, Routes} from "react-router-dom";
import Articles from './components/Articles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';


function App() {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])



  return (
    <>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ButtonAppBar/>
        <Box component="main" sx={{p: 3, margin: "auto", padding: "auto", width: "90%", marginTop: 4}}>
          <Toolbar/>
          <Routes>
            <Route path="/" element= {<Articles />}/>
            <Route path="/login" element= {<Login />}/>
          </Routes>
        </Box>
        </ThemeProvider>
    </>
  )
}

export default App

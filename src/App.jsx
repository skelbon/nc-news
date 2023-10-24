import * as React from 'react'
import { useState } from 'react'
import './App.css'
import {Box, CssBaseline, Toolbar} from "@mui/material";
import ButtonAppBar from './components/NavBar'
import {Route, Routes} from "react-router-dom";
import Articles from './components/Articles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecipeReviewCard from './components/ArticleComplexCard';


function App() {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme}>
      
      <CssBaseline/>
      <ButtonAppBar/>
      <Box component="main" sx={{p: 3, margin: "auto", padding: "auto", width: "90%", marginTop: 4}}>
        <Toolbar/>
        <Routes>
          <Route path="/" element= {<Articles />}/>
        </Routes>
      </Box>
      </ThemeProvider>
    </>
  )
}

export default App

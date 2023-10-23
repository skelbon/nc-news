import { useState } from 'react'
import './App.css'
import {Box, CssBaseline, Toolbar} from "@mui/material";
import ButtonAppBar from './components/NavBar'
import {Route, Routes} from "react-router-dom";
import Articles from './components/Articles';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline/>
      <ButtonAppBar/>
      <Box component="main" sx={{p: 3, margin: "auto", padding: "auto", width: "90%", marginTop: 4}}>
        <Toolbar/>
        <Routes>
          <Route path="/" element= {<Articles />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App

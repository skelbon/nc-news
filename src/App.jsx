import { useState, useMemo, useEffect } from 'react'
import './App.css'
import {Box, CssBaseline, Toolbar} from "@mui/material";
import NewsAppBar from './components/NavBar'
import {Route, Routes, useLocation} from "react-router-dom";
import Articles from './components/Articles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';
import TopicsDrawer from "./components/TopicsDrawer";
import { getTopics } from './network/network';
import SortBar from './components/SortBar';
import PageNotFound from './components/PageNotFound';

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

 
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [topics, setTopics] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [order, setOrder] = useState('DESC')
  const [location, setLocation] = useState(useLocation())
  
  const fetchTopics = async ()=>{
    setTopics(await getTopics())

  }
  
  useEffect (()=>{
    fetchTopics() 
    }, [])
 
  return (
    <>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <NewsAppBar setDrawerOpen={setDrawerOpen} />
        <TopicsDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} topics={topics}/>
        <Box component="main" sx={{p: 3, margin: "auto", padding: "auto", width: "90%", marginTop: 4}}>
          <Toolbar style={{minHeight: 42, marginBottom: '5px'}} />
          <SortBar sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
          
          <Routes>
            <Route path="/" element= {<Articles filter={null} sortBy={sortBy} order={order}/>}/>
            <Route path="/login" element= {<Login />}/>
            { topics.map((topic) => <Route path={`/${topic.slug}`} element= {<Articles filter={topic.slug} sortBy={sortBy} order={order}/>}/>)}
            <Route path="/*" element= {<PageNotFound/>}/>

          </Routes>
        </Box>
        </ThemeProvider>
    </>
  )
}

export default App
